import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Donation } from "./Donation";

@Entity()
export class DonationPlace {

    @PrimaryGeneratedColumn()
    place_id: number;

    @Column()
    name: string;

    @Column()
    postcode: string;

    @Column()
    town: string;

    @Column()
    address: string;

    @Column()
    active: boolean;

    @OneToMany(() => Donation, (donation: Donation) => donation.donation_id)
    donations: Donation[]
}
