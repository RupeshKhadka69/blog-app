import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { User } from "./user.entities";
import { Comment } from "./comment.entities";
import { Post } from "./post.entities";

@Entity("likes")
export class Like {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.likes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: User;

  @Column()
  userId!: string;

  @ManyToOne(() => Post, (post) => post.likes, {
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({ name: "postId" })
  @Column({ nullable: true })
  postId!: string;

  @ManyToOne(() => Comment, (comment) => comment.likes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "commentId" })
  comment!: Comment;

  @Column({ nullable: true })
  commentId!: string;
}
