import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user){

    console.log(user);

    if(user.username == undefined || user.email == undefined || user.name == undefined || user.password == undefined || user.accountType == undefined){
      return false;
    } else {
      return true;
    }
  }

  validateUsername(username){
    if(username === 'user' || username === 'auth' || username === 'login' || username === 'signup'){
      return false;
    } else{
      return true;
    }
  }

  validateEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
