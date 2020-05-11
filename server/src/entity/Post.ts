import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { User } from "./User";
import Comment from "./Comment";

@Entity()
export default class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne(type => User)
    author: User;

    @OneToMany(t => Comment, t => t.post, { eager: false })
    comments: Comment[];
}