import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import Commerce from "./Commerce";

@Entity("contacts")
export default class Contact {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: "14" })
  phone1: string;

  @Column({ length: "14" })
  phone2: string;

  @Column()
  instagram: string;

  @Column()
  facebook: string;

  @Column()
  whatsapp: string;

  constructor(
    phone1: string,
    phone2: string,
    instagram: string,
    facebook: string,
    whatsapp: string
  ) {
    this.phone1 = phone1;
    this.phone2 = phone2;
    this.instagram = instagram;
    this.facebook = facebook;
    this.whatsapp = whatsapp;
  }
}
