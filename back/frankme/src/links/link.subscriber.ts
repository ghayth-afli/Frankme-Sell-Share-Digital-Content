import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Link } from './entities/link.entity';
import { BadRequestException, Logger } from '@nestjs/common';
import { baseUrl, ipfsBase } from './config/base-url.config';

@EventSubscriber()
export class LinkSubscriber implements EntitySubscriberInterface<Link> {
  private readonly logger = new Logger(LinkSubscriber.name);

  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }
  listenTo() {
    return Link;
  }

  beforeInsert(event: InsertEvent<Link>): void | Promise<any> {
    if (!event.entity.ipfsUrl.includes(ipfsBase)) {
      throw new BadRequestException('Wrong ipfs link');
    }
    this.logger.log('Checker on ipfs link');
    const ipfs: Array<string> = event.entity.ipfsUrl.split('/');
    const ipfsLinkId = ipfs[ipfs.length - 2].split('.')[0];
    event.entity.url = `${baseUrl}/${ipfsLinkId}`;
  }
}
