import { Link } from 'src/links/entities/link.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: 'seller' })
  role: string;

  @Column({ default: 'https://api.dicebear.com/8.x/lorelei/svg?seed=jhon' })
  profilePicture: string;

  @Column()
  hashedPassword: string;

  @Column({ unique: true })
  phone: string;

  @Column({ default: false })
  isTfaEnabled: boolean;

  @Column({ nullable: true })
  tfaSecret: string;

  @Column({ default: 0 })
  balance: number;

  @Column({ default: '0x0000000000000000000000000000000000000000' })
  walletAddress: string;

  @OneToMany(() => Link, (link) => link.user)
  links: Link[];

  static removeHashedPassword(userObj: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hashedPassword, ...userWithoutPassword } = userObj;
    return userWithoutPassword;
  }
}
