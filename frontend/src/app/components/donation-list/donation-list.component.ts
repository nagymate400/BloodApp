import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DonationData } from 'src/app/models/Donation.Data';
import { DonationPlaceData } from 'src/app/models/DonationPlace.Data';
import { DonationService } from 'src/app/services/donation.service';
import { DonationPlaceService } from 'src/app/services/donationPlace.service';

@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.css']
})
export class DonationListComponent implements OnInit, OnDestroy {

  donationElements: any = [];
  private donationSub: Subscription;
  donationPlaceElements: DonationPlaceData[] = [];
  private donationPlaceSub: Subscription;

  successfulSearch: boolean;
  searchedElements: any[] = [];

  searchInputInDate:Date
  searchInputOutDate:Date
  searchInputName:string
  searchInputPlace:string

  constructor(private donationService: DonationService, private donationPlaceService: DonationPlaceService) { }

  ngOnDestroy(): void {
    this.donationPlaceSub.unsubscribe();
    this.donationSub.unsubscribe();
  }

  dateFormater(givenDate: string): Date {
    return new Date(givenDate);
  }

  ngOnInit(): void {
    this.donationService.getAllDonationPlace();
    this.donationSub = this.donationService
      .getDonationElementsUpdateListener()
      .subscribe((elements: DonationData[]) => {
        console.log(elements);
        this.donationElements = elements;
      });

    this.donationPlaceService.getAllDonationPlace();
    this.donationPlaceSub = this.donationPlaceService
        .getDonationPlaceElementsUpdateListener()
        .subscribe((elements: DonationPlaceData[]) => {
          console.log(elements);
          this.donationPlaceElements = elements;
        });
  }

  onSearch(){
    console.log(this.searchInputInDate, this.searchInputOutDate, this.searchInputName, this.searchInputPlace)
    this.searchedElements = [];

    if(this.searchInputInDate > this.searchInputOutDate){
      alert("Start date cant be bigger than out date")
      this.searchInputInDate = null;
      return
    }
    if(this.searchInputOutDate< this.searchInputInDate){
      alert("End date cant be smaller than in date")
      this.searchInputOutDate = null;
      return
    }
    if(this.searchInputInDate == undefined && this.searchInputOutDate != undefined || this.searchInputInDate != undefined && this.searchInputOutDate==undefined){
      alert("Define both date")
      this.searchInputOutDate = null;
      this.searchInputInDate = null;
      return
    }


    //JUST SEARCH NAME
    if(this.searchInputName != undefined && this.searchInputInDate == undefined && this.searchInputOutDate== undefined && this.searchInputPlace== undefined){
      for (let i = 0; i < this.donationElements.length; i++) {
        if (this.donationElements[i].donor_id_fk.name.includes(this.searchInputName)) {
          this.searchedElements.push(this.donationElements[i]);
        }
      }
      console.log(this.searchedElements)
    }

    //JUST DATE
    if(this.searchInputName == undefined && this.searchInputInDate != undefined && this.searchInputOutDate != undefined && this.searchInputPlace== undefined){
      for (let i = 0; i < this.donationElements.length; i++) {
        if (this.donationElements[i].donation_date >= this.searchInputInDate && this.donationElements[i].donation_date <= this.searchInputOutDate) {
          this.searchedElements.push(this.donationElements[i]);
        }
      }
      console.log(this.searchedElements)
    }

    //JUST PLACE
    if(this.searchInputName == undefined && this.searchInputInDate == undefined && this.searchInputOutDate== undefined && this.searchInputPlace != undefined){
      for (let i = 0; i < this.donationElements.length; i++) {
        if (this.donationElements[i].donationPlace_id_fk.name.includes(this.searchInputPlace)) {
          this.searchedElements.push(this.donationElements[i]);
        }
      }
      console.log(this.searchedElements)
    }

    //JUST NAME AND DATE
    if(this.searchInputName != undefined && this.searchInputInDate != undefined && this.searchInputOutDate != undefined && this.searchInputPlace== undefined){
      for (let i = 0; i < this.donationElements.length; i++) {
        if (this.donationElements[i].donor_id_fk.name.includes(this.searchInputName) && this.donationElements[i].donation_date >= this.searchInputInDate && this.donationElements[i].donation_date <= this.searchInputOutDate) {
          this.searchedElements.push(this.donationElements[i]);
        }
      }
      console.log(this.searchedElements)
    }

    //JUST NAME AND PLACE
    if(this.searchInputName != undefined && this.searchInputInDate == undefined && this.searchInputOutDate== undefined && this.searchInputPlace != undefined){
      for (let i = 0; i < this.donationElements.length; i++) {
        if (this.donationElements[i].donor_id_fk.name.includes(this.searchInputName) && this.donationElements[i].donationPlace_id_fk.name.includes(this.searchInputPlace)) {
          this.searchedElements.push(this.donationElements[i]);
        }
      }
      console.log(this.searchedElements)
    }

    //JUST DATE AND PLACE
    if(this.searchInputName == undefined && this.searchInputInDate != undefined && this.searchInputOutDate != undefined && this.searchInputPlace != undefined){
      for (let i = 0; i < this.donationElements.length; i++) {
        if (this.donationElements[i].donationPlace_id_fk.name.includes(this.searchInputPlace) && this.donationElements[i].donation_date >= this.searchInputInDate && this.donationElements[i].donation_date <= this.searchInputOutDate) {
          this.searchedElements.push(this.donationElements[i]);
        }
      }
      console.log(this.searchedElements)
    }


    //JUST NAME AND DATE AND PLACE
    if(this.searchInputName != undefined && this.searchInputInDate != undefined && this.searchInputOutDate!= undefined && this.searchInputPlace != undefined){
      for (let i = 0; i < this.donationElements.length; i++) {
        if (this.donationElements[i].donor_id_fk.name.includes(this.searchInputName) && this.donationElements[i].donationPlace_id_fk.name.includes(this.searchInputPlace) && this.donationElements[i].donation_date >= this.searchInputInDate && this.donationElements[i].donation_date <= this.searchInputOutDate) {
          this.searchedElements.push(this.donationElements[i]);
        }
      }
      console.log(this.searchedElements)
    }

    if(this.searchedElements.length > 0){
      this.successfulSearch = true
      this.searchInputInDate = null
      this.searchInputOutDate = null
      this.searchInputName = null
      this.searchInputPlace = null
    }
    else{
      alert('Not founded elements with these conditions')
      this.successfulSearch = false;
      this.searchInputInDate = null
      this.searchInputOutDate = null
      this.searchInputName = null
      this.searchInputPlace = null
    }

  }


}
