import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DonationPlaceData } from 'src/app/models/DonationPlace.Data';
import { AuthService } from 'src/app/services/auth.service';
import { DonationPlaceService } from 'src/app/services/donationPlace.service';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css'],
})
export class PlaceListComponent implements OnInit, OnDestroy {
  donationPlaceElements: DonationPlaceData[] = [];
  private donationPlaceSub: Subscription;

  userIsAuthenticated = false;
  private authListnerSubs: Subscription;

  constructor(
    private donationPlaceService: DonationPlaceService,
    private authService: AuthService
  ) {}

  ngOnDestroy(): void {
    this.donationPlaceSub.unsubscribe();
    this.authListnerSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.donationPlaceService.getAllDonationPlace();
    this.donationPlaceSub = this.donationPlaceService
      .getDonationPlaceElementsUpdateListener()
      .subscribe((elements: DonationPlaceData[]) => {
        console.log(elements);
        this.donationPlaceElements = elements;
      });

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListnerSubs = this.authService
      .getAuthStatusListnere()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onDelete(id: string) {
    this.donationPlaceService.donationPlaceDeleteById(id).subscribe(() => {
      this.donationPlaceService.getAllDonationPlace();
    });
  }

  onActiveStatusChange(element: DonationPlaceData) {
    console.log(element.active);
    element.active = !element.active;
    console.log(element.active);
    this.donationPlaceService
      .donationPlaceChangeActive(element)
      .subscribe(() => {
        //this.donationService.getAllDonationPlace();
      });
  }
}
