import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Link {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, (user) => user.links)
  user: User;
  @Column({ nullable: false })
  title: string;
  @Column({ nullable: false })
  url: string;
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
}
