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

  getUser(id: string): Observable<User> {
    return this.Http.get<User>(environment.urlUsers + `/${id}`);
  }

  getUsersChat(): Observable<User[]> {
    return this.Http.get(environment.urlUsers)
      .pipe(
        map(data => data as User[])
      );
  }

  uploadImage(Token: String, image: File): Observable<User> {
    const data = new FormData();
    data.append('image', image);
    return this.Http.put<User>(environment.apiUrlUserUpload, data, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + Token,
        'Accept-Type': 'application/json'
      })
    });
  }
}
