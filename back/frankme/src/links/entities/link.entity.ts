import { User } from 'src/users/entities/user.entity';
import { File } from './file.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Link {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, (user) => user.links)
  user: User;
  @Column({ nullable: false })
  title: string;
  @Column({
    // unique: true,
    nullable: false,
    comment: 'Unique url related to frankme',
  })
  url: string;
  @Column({
    // unique: true,
    nullable: false,
    comment: 'Unique url related to aws bucket',
  })
  bucketUrl: string;
  @Column({ nullable: false })
  price: number;
  @Column({})
  uploadedDate: string;
  @Column({ default: null })
  expirationDate?: string;
  @Column({ default: true })
  isActive: boolean;
  @Column({ default: null })
  maxDownloadCount?: number;
  @Column({ default: 0 })
  numberOfCLicks: number;
  @Column({ default: 0 })
  numberOfDownload: number;

  @OneToMany(() => File, (file) => file.link, { cascade: true })
  files: File[];
}
