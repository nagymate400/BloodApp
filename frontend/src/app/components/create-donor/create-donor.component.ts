import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DonorService } from 'src/app/services/donor.service';

@Component({
  selector: 'app-create-donor',
  templateUrl: './create-donor.component.html',
  styleUrls: ['./create-donor.component.css'],
})
export class CreateDonorComponent implements OnInit {
  form: FormGroup;

  constructor(private donorService: DonorService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      }),
      sex: new FormControl(null, {
        validators: [Validators.required],
      }),
      nationality: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      }),
      birth_place: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      }),
      birth_time: new FormControl(null, {
        validators: [Validators.required],
      }),
      postcode: new FormControl(null, {
        validators: [Validators.required],
      }),
      town: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      }),
      address: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      }),
      taj_code: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  async onSaveNewDonor() {
    console.log(this.form);

    this.tajCodeValidation(this.form.get('taj_code').value);

    if (
      await this.donorService.isDonorExistingByTajCode(
        this.form.get('taj_code').value
      )
    ) {
      alert('This taj code is already in the database');
      this.form.get('taj_code').reset();
      return;
    }

    if (this.ageValidation(this.form.get('birth_time').value) < 18) {
      alert('Age is not over 18, donation is not allowed');
      this.form.get('birth_time').reset();
      return;
    }

    if (!this.tajCodeValidation(this.form.get('taj_code').value)) {
      alert('Taj number is not correct, or is used');
      this.form.get('taj_code').reset();
      return;
    }

    if (this.form.invalid) {
      console.log('Something wrong with the form!');
      alert('The form is not valid please check your data again');
      if (this.form.get('name').invalid) {
        this.form.get('name').reset();
      }
      if (this.form.get('sex').invalid) {
        this.form.get('sex').reset();
      }
      if (this.form.get('nationality').invalid) {
        this.form.get('nationality').reset();
      }
      if (this.form.get('birth_place').invalid) {
        this.form.get('birth_place').reset();
      }
      if (this.form.get('birth_time').invalid) {
        this.form.get('birth_time').reset();
      }
      if (this.form.get('postcode').invalid) {
        this.form.get('postcode').reset();
      }
      if (this.form.get('town').invalid) {
        this.form.get('town').reset();
      }
      if (this.form.get('address').invalid) {
        this.form.get('address').reset();
      }
      return;
    }
    alert('Minden adat helyes');
    this.donorService.addNewDonor(
      this.form.value.name,
      this.form.value.sex,
      this.form.value.nationality,
      this.form.value.birth_place,
      this.form.value.birth_time,
      this.form.value.postcode,
      this.form.value.town,
      this.form.value.address,
      this.form.value.taj_code
    );
  }

  ageValidation(dateString: string): number {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }


  tajCodeValidation(tajCode: string): boolean {
    let isnum: boolean = /^\d+$/.test(tajCode);
    if (tajCode == null || tajCode.length != 9 || !isnum) {
      return false;
    }

    var numbers = tajCode.split('').map(function (item) {
      return parseInt(item, 10);
    });

    let cdv =
      (7 * (numbers[0] + numbers[2] + numbers[4] + numbers[6]) +
        3 * (numbers[1] + numbers[3] + numbers[5] + numbers[7])) %
      10;
    console.log(cdv);
    if (cdv != numbers[8]) {
      return false;
    }

    console.log(numbers);
    return true;
  }
}
