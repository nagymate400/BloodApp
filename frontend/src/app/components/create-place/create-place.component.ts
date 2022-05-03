import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DonationPlaceService } from 'src/app/services/donationPlace.service';

@Component({
  selector: 'app-create-place',
  templateUrl: './create-place.component.html',
  styleUrls: ['./create-place.component.css']
})
export class CreatePlaceComponent implements OnInit {
  form: FormGroup;



  constructor(private donationPlaceService: DonationPlaceService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      }),
      postcode: new FormControl(null, {
        validators: [Validators.required],
      }),
      town: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      address: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      active: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  onSaveNewPlace() {
    console.log(this.form.get('active').value)
    if (this.form.invalid) {
      console.log('Something wrong with the form!');
      alert('The form is not valid please check your data again');

      if(this.form.get('name').invalid){
        this.form.get('name').reset()
      }
      if(this.form.get('postcode').invalid){
        this.form.get('postcode').reset()
      }
      if(this.form.get('town').invalid){
        this.form.get('town').reset()
      }
      if(this.form.get('address').invalid){
        this.form.get('address').reset()
      }
      return;
    }

    console.log(this.form);

    this.donationPlaceService.addNewDonationPlace(
      this.form.value.name,
      this.form.value.postcode,
      this.form.value.town,
      this.form.value.address,
      this.form.value.active
    );

  }

}
