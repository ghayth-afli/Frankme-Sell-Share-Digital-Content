import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link) private readonly linksRepository: Repository<Link>,
  ) {}
  create(createLinkDto: CreateLinkDto, user: User) {
    const {
      title,
      url,
      price,
      isActive,
      expirationDate = null,
      maxDownloadCount = null,
    } = createLinkDto;
    const link = this.linksRepository.create({
      title,
      url,
      price,
      isActive,
      maxDownloadCount,
      expirationDate,
      uploadedDate: new Date().toISOString().split('T')[0],
    });
    link.user = user;
    return this.linksRepository.save(link);
  }

  async findAll(user: User) {
    const links = await this.linksRepository.find({
      where: { user },
    });
    if (!links) {
      throw new NotFoundException('No links found');
    }
    return links;
  }

  async findOne(id: number, user: User) {
    const link = await this.linksRepository.findOne({
      where: {
        user,
        id,
      },
    });
    if (!link) {
      throw new NotFoundException(`Link with id ${id} not found`);
    }
    return link;
  }

  update(id: number, updateLinkDto: UpdateLinkDto, user: User) {
    const link = this.linksRepository.update(
      {
        id,
        user,
      },
      updateLinkDto,
    );
    return link;
  }

  async remove(id: number, user: User) {
    try {
      const link = await this.findOne(id, user);
      return this.linksRepository.remove(link);
    } catch (error) {
      throw new NotFoundException(`Link with id ${id} not found`);
    }
  }
}
