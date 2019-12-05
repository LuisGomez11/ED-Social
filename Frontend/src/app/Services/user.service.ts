import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Models/user';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private Http: HttpClient
    ) { }

  getUsers(): Observable<User[]> {
    return this.Http.get<User[]>(environment.urlUsers);
  }

  getUsersChat(): Observable<User[]> {
    return this.Http.get(environment.urlUsers)
    .pipe(
      map(data => data as User[])
    );
  }
}
