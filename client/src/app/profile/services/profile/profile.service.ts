import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProfileModel } from './models/profile.model';
import { FileModel } from './models/file.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  user: any;
  profilePic: File = null;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,

  ) { }

  getProfile(){
    return this.user;
  }

  loadRequestedProfileImage(username){
    return this.http.get('http://localhost:3000/profile/find/image?username='+username, {responseType: 'blob'});
  }

  loadRequestedProfile(username){
    return this.http.get<ProfileModel>('http://localhost:3000/profile/find?username='+username)
      .pipe(
        map(Response => {
          this.user = Response.user;
          console.log(this.user);
          return Response;
        })
      );
  }

}
