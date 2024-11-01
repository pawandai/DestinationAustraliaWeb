import { Entity, Column, Index } from "typeorm";
import BaseEntity from "./Base";

@Entity("users")
export class User extends BaseEntity {
  // @Column()
  // fullName!: string;

  @Index("email_index")
  @Column({
    unique: true,
  })
  email!: string;

  @Column()
  password!: string;

  @Column({
    default: "startek.png",
  })
  photo!: string;

  @Column({
    default: false,
  })
  verified!: boolean;

  // @OneToMany(() => Post, (post) => post.user)
  // posts!: Post[];
}
