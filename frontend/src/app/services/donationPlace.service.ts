import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { DonationPlaceData } from '../models/DonationPlace.Data';

@Injectable({ providedIn: 'root' })
export class DonationPlaceService {
  constructor(private http: HttpClient, private router: Router) {}

  addNewDonationPlace(
    name: string,
    postcode: number,
    town: string,
    address: string,
    active: boolean
  ) {
    const newElement: DonationPlaceData = {
      place_id: null,
      name: name,
      postcode: postcode,
      town: town,
      address: address,
      active: active,
    };
    this.http
      .post<{ message: string; place_id: number }>(
        'http://localhost:3000/api/donationplace',
        newElement
      )
      .subscribe((responseData) => {
        const id = responseData.place_id;
        //console.log(responseData.message);
        this.router.navigate(['/donationplaces']);
      });
  }



  private donationPlaceElements: DonationPlaceData[] = [];
  private donationPlaceElementsUpdated = new Subject<DonationPlaceData[]>();

  getAllDonationPlace(){
    this.http
      .get<{ message: string; elements: any}>('http://localhost:3000/api/donationplace')
      .pipe(
        map((donationPlaceData) => {
          return donationPlaceData.elements.map((element) => {
            return {
              place_id: element.place_id,
              name: element.name,
              postcode: element.postcode,
              town: element.town,
              address: element.address,
              active: element.active,
            };
          });
        })
      )
      .subscribe((transformedElements) => {
        this.donationPlaceElements = transformedElements;
        this.donationPlaceElementsUpdated.next([...this.donationPlaceElements]);
      });
  }

  getDonationPlaceElementsUpdateListener(){
    return this.donationPlaceElementsUpdated.asObservable();
  }

  donationPlaceDeleteById(elementId: string){
    console.log(elementId)
    return this.http.delete('http://localhost:3000/api/donationplace/' + elementId);
  }

  donationPlaceChangeActive(element: DonationPlaceData){
    console.log(element.place_id);
    return this.http.patch<{ message: string; place_id: number }>('http://localhost:3000/api/donationplace', element)
  }
}
