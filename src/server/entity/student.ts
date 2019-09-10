import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { IStudent } from "../../types";

@Entity()
export class Student implements IStudent{
    @Column()
    phone!: number;
    @Column()
    age!: number
    @Column()
    key?: number  ;
    @Column()
    account!: string;
    @Column()
    password!: string;
    @Column()
    nickname!: string;
    @Column()
    job!: string;
    @Column()
    hobby!: string;
    @PrimaryGeneratedColumn()
    _id!: string;

}