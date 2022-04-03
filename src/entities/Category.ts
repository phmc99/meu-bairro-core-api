import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("categories")
export default class Category {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true, length: "30" })
  name: string;

  @Column({ length: "180" })
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
