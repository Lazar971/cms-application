import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Post from "./Post";
import { User } from "./User";


@Entity()
export default class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @ManyToOne(type => Post, p => p.comments, { primary: true, cascade: true })
    post: Post;

    @ManyToOne(t => User)
    user: User;
}