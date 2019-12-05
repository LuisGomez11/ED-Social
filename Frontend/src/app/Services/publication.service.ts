import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Publication } from '../Models/publication';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(
    private Http: HttpClient
    ) { }

  getPublications(): Observable<Publication[]> {
    return this.Http.get<Publication[]>(environment.urlPublication);
  }

  addPublication(publication: Publication): Observable<Publication> {
    return this.Http.post<Publication>(environment.urlPublication, publication);
  }
}
