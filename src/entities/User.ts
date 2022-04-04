import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import Commerce from "./Commerce";
import bcrypt from "bcrypt";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ length: 15, unique: true })
  phone!: string;

  @Column({ type: "date" })
  birthDate!: Date;

  @Column()
  avatarUrl!: string;

  @Column({select: false})
  password!: string;

  @Column({ default: false })
  isAdm!: boolean;

  @Column({ default: false })
  hasCommerce!: boolean;

  @OneToMany((type) => Commerce, (commerce) => commerce.owner)
  commerces!: Commerce[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
