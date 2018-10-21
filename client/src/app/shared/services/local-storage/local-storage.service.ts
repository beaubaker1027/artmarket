import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  user: any;

  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router
  ) { }

  getUser(){
    if(!this.user){
      this.user = localStorage.getItem('user');
      this.user = JSON.parse(this.user);
    }
    return this.user;
  }

  getEmail(){
    if(!this.user){
      this.user = localStorage.getItem('user');
      this.user = JSON.parse(this.user);
    }
    if(this.user){
      return this.user.email;
    }
  }

  storeUserData(user){
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }

  getFullName(){
    if(!this.user){
      this.user = localStorage.getItem('user');
      this.user = JSON.parse(this.user);
    }
    if(this.user){
      return this.user.name;
    }
  }

  getUserName(){
    if(!this.user){
      this.user = localStorage.getItem('user');
      this.user = JSON.parse(this.user);
    }
    if(this.user){
      return this.user.username;
    }
  }

  isNotLoggedIn(){
    return this.jwtHelper.isTokenExpired();
  }

  logout(){
    console.log('logout')
    this.user = null;
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
