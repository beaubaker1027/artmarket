import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

//modules
import { LocalStorageService } from '../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.css']
})
export class UserDropdownComponent implements OnInit {

  @Input() username: string;
  constructor(
    private localStorageService:LocalStorageService,
    private flashMessage:FlashMessagesService,
    private router:Router
  ) { }

  ngOnInit(
  ) {}

  onLogoutClick(){
    this.localStorageService.logout();
    return false;
  }
}
