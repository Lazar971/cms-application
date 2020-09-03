import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import Post from "./Post";

@Entity()
export default class Tag {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(type => Post, post => post.tags, { eager: false })
    posts: Post[]
}