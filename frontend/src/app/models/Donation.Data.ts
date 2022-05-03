export interface DonationData{
    donation_id: number,
    donation_date: Date,
    success_donation: boolean,
    about: string,
    directed_donation: boolean,
    directed_name: string,
    directed_taj_code: string,
    donor_id_fk: number,
    doctor_id_fk: number,
    donationPlace_id_fk: number
}
