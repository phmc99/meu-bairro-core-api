import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import Commerce from "./Commerce";

@Entity("images")
export default class Images {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  avatar: string;

  @Column()
  image1: string;

  @Column()
  image2: string;

  @Column()
  image3: string;

  @Column()
  image4: string;

  @Column()
  image5: string;

  constructor(
    avatar: string,
    image1: string,
    image2: string,
    image3: string,
    image4: string,
    image5: string
  ) {
    this.avatar = avatar;
    this.image1 = image1;
    this.image2 = image2;
    this.image3 = image3;
    this.image4 = image4;
    this.image5 = image5;
  }
}
