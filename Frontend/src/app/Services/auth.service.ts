import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Models/user';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { Router } from '@angular/router';
import CryptoJS from 'crypto-js/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private Http: HttpClient,
    private router: Router
    ) { }

  SignUp(user: User): Observable<any> {
    return this.Http.post<any>(environment.urlSignUp, user);
  }

  Login(user: User): Observable<any> {
    return this.Http.post<any>(environment.urlLogin, user)
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getStorage(): User {
    const User = localStorage.getItem('user');
    if (User === null) return null;
    try {
      return JSON.parse(CryptoJS.AES.decrypt(User, environment.Encrypt).toString(CryptoJS.enc.Utf8)) as User;
    } catch (error) {
      return null;
    }
  }

  setItemStorage(User: User) {
    try {
      const UserEncrypt = CryptoJS.AES.encrypt(JSON.stringify(User), environment.Encrypt);
      localStorage.setItem('user', UserEncrypt);
    } catch (error) {

    }
  }

}
