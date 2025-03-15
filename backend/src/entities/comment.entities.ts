import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { User } from "./user.entities";
import { Post } from "./post.entities";
import { Like } from "./likes.entities";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("text")
  content!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(()=> User, user => user.comments, {onDelete: "CASCADE"})
  @JoinColumn({name: "authorId"})
  author!: User;

  @Column()
  authorId!: string;

  @ManyToOne(()=> Post, post => post.comments, {onDelete: "CASCADE"})
  @JoinColumn({name: "postId"})
  post!: Post;

  @Column()
  postId!: string;

  @OneToMany(()=> Like, (like)=> like.comment)
  likes!: Like[];

}
