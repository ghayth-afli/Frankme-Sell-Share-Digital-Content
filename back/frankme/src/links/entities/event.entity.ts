import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  url: string;

  @Column()
  date: string;

  constructor(event: Partial<Event>) {
    Object.assign(this, event);
  }
}
