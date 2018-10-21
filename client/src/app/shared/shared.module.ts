import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//Components
import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { UserDropdownComponent } from './components/user-dropdown/user-dropdown.component';

//services
import { NavService } from './components/nav/service/nav.service'

@NgModule({
  declarations: [
    FooterComponent,
    NavComponent,
    SearchBarComponent,
    UserDropdownComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  providers:[
    NavService,
  ],
  exports: [
    NavComponent,
    SearchBarComponent,
    FooterComponent
  ]
})
export class SharedModule { }
