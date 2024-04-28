import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  hashedPassword: string;

  @Column({ unique: true })
  phone: string;

  @Column({ default: false })
  isTfaEnabled: boolean;

  @Column({ nullable: true })
  tfaSecret: string;

  static removeHashedPassword(userObj: User) {
    const { hashedPassword, ...userWithoutPassword } = userObj;
    return userWithoutPassword;
  }
}
