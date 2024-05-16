import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { Event } from './entities/event.entity';
import { PaymentService } from 'src/payment/payment.service';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link) private readonly linksRepository: Repository<Link>,
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
    private readonly entityManager: EntityManager,
    private readonly usersService: UsersService,
    private readonly paymentService: PaymentService,
  ) {}
  async create(createLinkDto: CreateLinkDto, user: ActiveUserData) {
    const {
      title,
      price,
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
    const uniqueLink = this.generateLink();
    const currentUser = await this.usersService.findOne(user.sub);
    const link = this.linksRepository.create({
      linkUniqueId: uniqueLink,
      title,
      price,
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

  async findByLinkId(id: string) {
    const link = await this.linksRepository.findOne({
      where: {
        linkUniqueId: id,
      },
      relations: { user: true, files: true },
    });

    if (!link) {
      throw new NotFoundException(`No link with url ${id}`);
    }
    if (!link.isActive) {
      throw new BadRequestException(`Link : ${id} is no longer active`);
    }
    if (link.numberOfDownload >= link.maxDownloadCount) {
      throw new BadRequestException(`Max download reached for the link ${id}`);
    }

    link.numberOfCLicks += 1;

    await this.entityManager.save(link);

    const result = {
      seller: link.user.firstName + ' ' + link.user.lastName,
      fileLink: link.files[0].file,
      fileName: link.files[0].file.substring(
        link.files[0].file.lastIndexOf('/') + 1,
      ),
      type: 'zip',
      price: link.price,
    };
    return result;
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

  async findLinkVerifiedPayment(id: string, paymentId: string) {
    console.log('paymentId: from verifivatoion ', paymentId);

    const paymentStatus = await this.paymentService.verifyPayment({
      paymentId,
    });
    if (paymentStatus.isVerified) {
      const url = `${baseUrl}/downloads/${id}?payment_id=${paymentId}`;
      // const event = await this.getEvent(url);
      // if (event) {
      //   throw new NotFoundException('This url doesnt exist');
      // } else {
      const link = await this.findByLinkId(id);
      await this.addEvent(url);
      return link.fileName;
      // }
    } else {
      throw new NotFoundException(`Cant find payment with id ${paymentId}`);
    }
  }

  private generateLink(): string {
    const uniqueId = uuidv4();
    return uniqueId;
  }

  private async getEvent(url: string) {
    const event = await this.eventsRepository.findOne({
      where: {
        url,
      },
    });
    console.log('event: ', event);

    return event ? event : false;
  }

  private async addEvent(url: string) {
    const currentDate = new Date();
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    const event = new Event({
      url,
      date: currentDate.toLocaleString('en-US', dateOptions),
    });
    const eventAdded = this.eventsRepository.create(event);
    await this.eventsRepository.save(eventAdded);
  }
}
