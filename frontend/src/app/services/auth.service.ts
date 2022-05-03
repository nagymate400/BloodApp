import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "../models/Auth.Data";

@Injectable({providedIn: 'root'})
export class AuthService{
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListnere() {
    return this.authStatusListener.asObservable();
  }

  creatUser(email: string, name: string, password: string) {
    const authData: AuthData = { email: email, name: name, password: password };
    this.http
      .post('http://localhost:3000/api/doctor/signup', authData)
      .subscribe((response) => {
        alert("Doctor created with this email address:  "+ authData.email)
        this.router.navigate(['/']);
        console.log('Signup responese:'+response);
      }, err => {
        alert("Email is used or database not working")
        console.log(err);
      })
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password, name:null };
    this.http
      .post<{ token: string; expiresIn: number }>(
        'http://localhost:3000/api/doctor/login',
        authData
      )
      .subscribe((response) => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          this.saveAuthData(token, expirationDate);
          console.log(expirationDate);
          this.router.navigate(['/']);
        }
      }, err => {
        alert("Email or password is not correct")
        console.log(err);
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if(!authInformation){
      this.router.navigate(['/login']);
      return null;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime()-now.getTime();
    if(expiresIn > 0){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private setAuthTimer(duration: number){
    console.log('Setting timer: '+duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/login']);
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return null;
    }

    return {
      token: token,
      expirationDate: new Date(expirationDate),
    };
  }

  private saveAuthData(toke: string, expirationDate: Date) {
    localStorage.setItem('token', this.token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token'), localStorage.removeItem('expiration');
  }
}
