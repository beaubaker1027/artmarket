import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CheckoutComponent } from './components/checkout/checkout.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CheckoutRoutingModule
  ],
  declarations: [
    CartComponent,
    CheckoutFormComponent,
    CheckoutComponent
  ]
})
export class CheckoutModule { }
