import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import Commerce from "./Commerce";

@Entity("feedback")
export default class Feedback {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "int" })
  rate!: number;

  @Column({ length: "180" })
  comment!: string;

  @Column()
  feedbackOwnerId!: string;

  @ManyToOne((type) => Commerce, (commerce) => commerce.feedback, {
    eager: true,
  })
  commerce!: Commerce;

  @CreateDateColumn()
  createdAt!: Date;
}
