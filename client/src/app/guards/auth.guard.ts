import { Injectable } from '@angular/core';
import { Router, CanActivate, CanDeactivate } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../auth/services/auth/auth.service';


@Injectable()
export class AuthGuard implements CanActivate{

  route: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location
  ){}

   canActivate(){
    if(!this.authService.isNotLoggedIn()){
      return true;
    } else {
      this.route = location.pathname
      this.router.navigate(['/login'], {
        queryParams: {
          return: this.route
        }
      });
      return false;
    }
  }
}
