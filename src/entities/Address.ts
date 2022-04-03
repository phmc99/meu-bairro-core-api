import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import Commerce from "./Commerce";

@Entity("addresses")
export default class Address {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: "10" })
  cep: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  neighborhood: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  complement: string;

  constructor(
    cep: string,
    state: string,
    city: string,
    neighborhood: string,
    street: string,
    number: string,
    complement: string
  ) {
    this.cep = cep;
    this.state = state;
    this.city = city;
    this.neighborhood = neighborhood;
    this.street = street;
    this.number = number;
    this.complement = complement;
  }
}
