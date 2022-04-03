import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import Category from "./Category";
import Adress from "./Address";
import Contact from "./Contact";
import Images from "./Images";
import { Address, User } from ".";
import Feedback from "./Feedback";

@Entity("commerces")
export default class Commerce {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: "60" })
  name: string;

  @Column({ unique: true, length: "18" })
  cnpj: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ default: true })
  active!: boolean;

  @ManyToMany(() => Category)
  @JoinTable()
  category!: Category[];

  @ManyToMany(() => Feedback)
  @JoinTable()
  feedback!: Feedback[];

  @OneToOne(() => Address, { eager: true })
  @JoinColumn()
  address!: Adress;

  @OneToOne(() => Contact, { eager: true })
  @JoinColumn()
  contact!: Contact;

  @OneToOne(() => Images, { eager: true })
  @JoinColumn()
  image!: Images | any;

  constructor(name: string, cnpj: string) {
    this.name = name;
    this.cnpj = cnpj;
  }

  @ManyToOne((type) => User, (user) => user.commerces, { eager: true })
  owner!: User;
}
