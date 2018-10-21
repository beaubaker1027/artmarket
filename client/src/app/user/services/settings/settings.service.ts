import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { map }            from 'rxjs/operators';

import { UploadSuccess } from './models/upload-success.model';
import { LocalStorageService } from '../../../shared/services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  token: any;
  constructor(
    private http:HttpClient,
    private localStorage:LocalStorageService,
  ) { }

  uploadArtwork(artwork){
    this.loadToken();
    let headers = new HttpHeaders()
      .set('Authorization', this.token);
    return this.http.post<UploadSuccess>('http://localhost:3000/user/artwork', artwork, {headers: headers});
  }

  loadToken(){
      const token = localStorage.getItem('id_token');
      this.token = token;
  }

  editUserInfo(formData){
      this.loadToken();
      let headers = new HttpHeaders()
        .set('Authorization', this.token);
      return this.http.post<UploadSuccess>('http://localhost:3000/user/edit', formData, {headers: headers});
  }

}
