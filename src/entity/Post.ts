import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import BaseEntity from "./Base";
import { User } from "./User";

@Entity("posts")
export class Post extends BaseEntity {
  @Column()
  content!: string;

  @Column({
    default: "startek.png",
  })
  image!: string;

  // @ManyToOne(() => User, (user) => user.posts)
  // @JoinColumn()
  // user!: User;
}
