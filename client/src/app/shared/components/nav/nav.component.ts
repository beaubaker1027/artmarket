import { Component, OnInit }  from '@angular/core';

//modules
import { LocalStorageService }        from '../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  username: string;

  constructor(
    private localStorageService:LocalStorageService,
  ) {}

  ngOnInit() {
    this.username = this.localStorageService.getUserName()
  }

}
