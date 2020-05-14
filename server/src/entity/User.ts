import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import UserCategory from "./UserCategory";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    username: string;

    @Column()
    password: string

    @ManyToOne(type => UserCategory)
    category: UserCategory;
}
