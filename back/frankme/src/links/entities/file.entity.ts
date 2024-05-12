import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Link } from './link.entity';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  file: string;
  @ManyToOne(() => Link, (link) => link.files)
  link: Link;

  constructor(file: Partial<File>) {
    Object.assign(this, file);
  }
}
