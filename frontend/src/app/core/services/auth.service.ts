
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authListener = new BehaviorSubject<boolean>(false);
  public isLoggedIn: boolean = false;
  private _user: User = {
    email: "",
    password: "",
    isWriter: false
  }
  get userEmail ():string {
    return this._user.email
  } 
  get user():User {
    return this._user
  }
  isVietnamese: boolean = false;

  constructor(private api: ApiService, private router: Router) {}

  signin(signinData: User){
    this.api.post('/api/user/login', signinData).subscribe(
      (res) => {
        this._user = res.user;
        this.setAuth(res.token);
        this.isLoggedIn = true;
        this.setAuth(res.token);
        console.log(res);
        this.authListener.next(true);
      },
      (err) => {
        console.log(err);
        alert(err.msg)
      }
    );
  }

  autoSignIn() {
    let token = this.getAuth();
    if (token == null) {
    } else {
      let data = { token: token };
      this.api.post('/api/user/autologin', data).subscribe(
        (res) => {
          this.isLoggedIn = true;
          console.log(res);
          this._user = res;
          this.authListener.next(true);
        },
        (err) => {
          console.log(err);
          this.authListener.next(false);
        }
      );
    }
  }

  getAuthListener(): Observable<boolean> {
    return this.authListener.asObservable();
  }

  logout(): void {
    this.clearAuth();
    this.authListener.next(false);
    this.isLoggedIn = false;
  }

  private setAuth(token: string): void {
    localStorage.setItem('token', token);
  }

  public getAuth() {
    return localStorage.getItem('token');
  }

  private clearAuth(): void {
    localStorage.clear();
  }
}
