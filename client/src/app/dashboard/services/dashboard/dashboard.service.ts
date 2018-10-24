import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { map }            from 'rxjs/operators';

import { RandomArtistsModel } from './models/randomArtists.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  header: any;
  randomArtist: Array<object>;

  constructor(
    private http:HttpClient,
  ) { }

  retrieveRandomArtists(){
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.get<RandomArtistsModel>('http://localhost:3000/dashboard/randomArtists/3', {headers: headers})
  }
}
