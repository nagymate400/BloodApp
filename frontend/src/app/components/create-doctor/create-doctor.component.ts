import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-doctor',
  templateUrl: './create-doctor.component.html',
  styleUrls: ['./create-doctor.component.css']
})
export class CreateDoctorComponent implements OnInit {


  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

  onSaveNewDoctor(form: NgForm){
    if (form.invalid) {
      return;
    }
    if(!this.validateEmail(form.value.email)){
      alert("Email format is not good")
      return;
    }

    this.authService.creatUser(form.value.email, form.value.username, form.value.password);


  }

  validateEmail(email:string) {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

}
