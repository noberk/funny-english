import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { IStudent } from "../../types";

@Entity()
export class Student implements IStudent{
    age!: number
    key?: number  ;
    account!: string;
    password!: string;
    nickname!: string;
    job!: string;
    hobby!: string;
    @PrimaryGeneratedColumn()
    _id!: string;

  
}