import {Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity} from "typeorm";
import { Donation } from "./Donation";

@Entity()
export class Donor extends BaseEntity {

    @PrimaryGeneratedColumn()
    donor_id: number;

    @Column()
    name: string;

    @Column()
    sex: string;

    @Column()
    nationality: string;

    @Column()
    birth_place: string;

    @Column()
    birth_time: Date;

    @Column()
    postcode: string;

    @Column()
    town: string;

    @Column()
    address: string;

    @Column({unique:true})
    taj_code: string;
    
    @OneToMany(() => Donation, (donation: Donation) => donation.donation_id)
    donations: Donation[]
}
