import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class User {

    @PrimaryColumn()
    id: number;
    @Column()
    firstName:string;
    @Column()
    lastName: string;
    @Column({unique: true})
    email: string;
    @Column()
    hashedPassword: string;
    @Column({unique: true})
    phone: string
}
