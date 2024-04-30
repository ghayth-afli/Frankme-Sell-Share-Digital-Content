import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link) private readonly linksRepository: Repository<Link>,
    private readonly usersService: UsersService,
  ) {}
  async create(createLinkDto: CreateLinkDto, user: ActiveUserData) {
    const {
      title,
      url,
      price,
      isActive,
      expirationDate = null,
      maxDownloadCount = null,
    } = createLinkDto;
    const currentUser = await this.usersService.findOne(user.sub);
    const link = this.linksRepository.create({
      title,
      url,
      price,
      isActive,
      maxDownloadCount,
      expirationDate,
      uploadedDate: new Date().toISOString().split('T')[0],
    });
    link.user = currentUser;
    console.log(link);

    return this.linksRepository.save(link);
  }

  async findAll(user: ActiveUserData) {
    const currentUser = await this.usersService.findOne(user.sub);
    const links = await this.linksRepository.find({
      relations: { user: true },
      where: { user: currentUser },
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
}
