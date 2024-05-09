import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';
import { EntityManager, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { v4 as uuidv4 } from 'uuid';
import { baseUrl, s3Bucket } from './config/base-url.config';
import { File } from './entities/file.entity';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link) private readonly linksRepository: Repository<Link>,
    private readonly entityManager: EntityManager,
    private readonly usersService: UsersService,
  ) {}
  async create(createLinkDto: CreateLinkDto, user: ActiveUserData) {
    const {
      title,
      price,
      isActive,
      expirationDate = null,
      maxDownloadCount = null,
      files,
    } = createLinkDto;
    const fileLinkedToUrl = files.map(
      (file) =>
        new File({
          file: `${s3Bucket}${file}`,
        }),
    );
    console.log(fileLinkedToUrl);
    const uniqueLink = this.generateLink();

    const currentUser = await this.usersService.findOne(user.sub);
    const link = this.linksRepository.create({
      url: uniqueLink,
      title,
      price,
      isActive,
      maxDownloadCount,
      expirationDate,
      uploadedDate: new Date().toISOString().split('T')[0],
    });
    link.user = currentUser;
    link.files = fileLinkedToUrl;
    return this.entityManager.save(link);
  }

  async findAll(user: ActiveUserData) {
    const currentUser = await this.usersService.findOne(user.sub);
    const links = await this.linksRepository.find({
      relations: { user: true, files: true },
      where: { user: currentUser },
      order: {
        uploadedDate: {
          direction: 'DESC',
        },
      },
    });
    if (!links) {
      throw new NotFoundException('No links found');
    }
    return links;
  }

  async findOne(id: number, user: ActiveUserData) {
    const currentUser = await this.usersService.findOne(user.sub);
    const link = await this.linksRepository.findOne({
      where: {
        user: currentUser,
        id,
      },
      relations: { files: true },
    });
    if (!link) {
      throw new NotFoundException(`Link with id ${id} not found`);
    }
    return link;
  }

  async update(id: number, updateLinkDto: UpdateLinkDto, user: ActiveUserData) {
    const currentUser = await this.usersService.findOne(user.sub);
    const link = this.linksRepository.update(
      {
        id,
        user: currentUser,
      },
      updateLinkDto,
    );
    return link;
  }

  async remove(id: number, user: ActiveUserData) {
    try {
      const link = await this.findOne(id, user);
      return this.linksRepository.remove(link);
    } catch (error) {
      throw new NotFoundException(`Link with id ${id} not found`);
    }
  }

  async summary(user: ActiveUserData) {
    const links: Link[] = await this.findAll(user);

    const result = {
      totalUploads: links.length,
      activeLinks: 0,
      totalClicks: 0,
      totalDownloads: 0,
    };
    links.forEach((link) => {
      result.activeLinks++ ? link.isActive : 0;
      result.totalClicks = link.numberOfCLicks;
      result.totalDownloads = link.numberOfDownload;
    });
    return result;
  }

  generateLink(): string {
    const uniqueId = uuidv4();
    return `${baseUrl}/${uniqueId}`;
  }
}
