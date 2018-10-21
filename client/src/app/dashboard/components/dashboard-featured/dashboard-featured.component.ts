import { Component, OnInit } from '@angular/core';
import { FlashMessagesService }   from 'angular2-flash-messages';

//Services
import { DashboardService } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard-featured',
  templateUrl: './dashboard-featured.component.html',
  styleUrls: ['./dashboard-featured.component.css']
})
export class DashboardFeaturedComponent implements OnInit {

  users: Array<any>;

  constructor(
    private dashboardService: DashboardService,
    private flashMessage: FlashMessagesService,
  ) {
   }

  ngOnInit() {
    this.dashboardService.retrieveRandomArtists().subscribe(data => {
      if(data.success){
        this.users = data.users;
      } else {
        return this.flashMessage.show(data.msg, {cssClass: 'alert', timeout: 3000});
      }
    })
  }


}
