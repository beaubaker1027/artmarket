import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { SearchModel } from './models/search.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient,
  ) { }

  searchProfiles(query): Observable<Array<any>>{
    console.log('query: ',query)
    if(!query.trim()){
      console.log('query: ',query);
      return of([]);
    }
    console.log(query);
    return this.http.get<SearchModel>('http://localhost:3000/profile/findAll?searchTerm='+query)
      .pipe(
        map(Response => {
          console.log(Response.users);
          return Response.users;
        }),
      );
  }


}
