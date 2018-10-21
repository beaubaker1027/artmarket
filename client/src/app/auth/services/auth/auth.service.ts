import { Injectable }     from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { map }            from 'rxjs/operators';
import { Router }         from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { RegistrationSuccess } from './models/register.model';
import { AuthTokenModel } from './models/authToken.model';
import { UserModel } from './models/user.model';
import { AuthUserModel } from './models/auth-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  registerUser(user){
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');
    return this.http.post<RegistrationSuccess>('http://localhost:3000/user/register', user, {headers: headers})
  }

  authenticateUser(formData) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post<AuthTokenModel>('http://localhost:3000/user/authenticate', formData, {headers: headers})
  }

  getProfile(){
    let headers = new HttpHeaders();
    this.loadToken();
    headers.set('Authorization', this.authToken);
    headers.set('Content-Type', 'application/json');
    return this.http.get<UserModel>('http://localhost:3000/user/profile', {headers: headers})
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  isNotLoggedIn(){
    return this.jwtHelper.isTokenExpired();
  }

  logout(){
    console.log('logout')
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
