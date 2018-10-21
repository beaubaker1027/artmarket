import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  user: any;

  constructor(
    private jwtHelper: JwtHelperService
  ) { }

  isNotLoggedIn(){
    return this.jwtHelper.isTokenExpired();
    //return false;
  }

  getUserName() {
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user)
    if(this.user){
      return this.user.username;
    }
    //return 'Hello';
  }

}
