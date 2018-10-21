import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { FlashMessagesModule } from 'angular2-flash-messages';

//Modules
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

//Components
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';

//Services
import { LocalStorageService } from './shared/services/local-storage/local-storage.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('id_token');
        },
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['localhost:3000'],
        throwNoTokenError: false,
        skipWhenExpired: true,
      }
    })
  ],
  providers: [
    LocalStorageService,
    AuthGuard,
    Title,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
