import { Component, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from 'ng-mat-carousel';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  slides = [
    {'image': 'https://media.istockphoto.com/vectors/blood-donation-concept-vector-id1256555401?k=20&m=1256555401&s=612x612&w=0&h=We4Ckw72r8-RSK_TOVG2jWtui1ntlQNgYeDo1lLi1qg='},
    {'image': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7fQFypU-q6iWz459s0I8NFgm7xbtBAq48Iup2XPdhvf1JHTVp4SGjY9FrRUqdC1Mpt7o&usqp=CAU'},

  ];

  constructor() { }

  ngOnInit(): void {
  }

}
