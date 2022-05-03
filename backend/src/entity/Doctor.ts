import {Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity} from "typeorm";
import { Donation } from "./Donation";

@Entity()
export class Doctor  {

    @PrimaryGeneratedColumn()
    doctor_id: number;

    @Column({unique:true})
    email: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @OneToMany(() => Donation, (donation: Donation) => donation.donation_id)
    donations: Donation[]
}
