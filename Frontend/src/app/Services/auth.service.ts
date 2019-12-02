import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Models/user';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private Http: HttpClient) { }

  SignUp(User: User): Observable<User> {
    return this.Http.post<User>(environment.apiUrlUser, User);
  }

}
