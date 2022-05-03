
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { DoctorData } from '../models/Doctor.Data';

@Injectable({ providedIn: 'root' })
export class DoctorService{

  private doctorElements: DoctorData[] = [];
  private doctorElementsUpdated = new Subject<DoctorData[]>();

  getAllDoctor(){
    this.http
      .get<{ message: string; elements: any}>('http://localhost:3000/api/doctor')
      .pipe(
        map((doctorData) => {
          return doctorData.elements.map((element) => {
            return {
              doctor_id: element.doctor_id,
              email: element.email,
              name: element.name,
              password: element.password,
            };
          });
        })
      )
      .subscribe((transformedElements) => {
        this.doctorElements = transformedElements;
        this.doctorElementsUpdated.next([...this.doctorElements]);
      });
  }

  getDoctorElementsUpdateListener(){
    return this.doctorElementsUpdated.asObservable();
  }

  constructor(private http: HttpClient, private router: Router) {}

}
