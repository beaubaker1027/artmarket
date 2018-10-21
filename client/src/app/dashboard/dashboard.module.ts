import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages';

//Modules
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module'

//Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardFeaturedComponent } from './components/dashboard-featured/dashboard-featured.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardHeaderComponent,
    DashboardFeaturedComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FlashMessagesModule.forRoot(),
    DashboardRoutingModule
  ],
})
export class DashboardModule { }
