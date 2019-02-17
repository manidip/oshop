import { SharedModule } from './../shared/shared.module';
import { AuthGuard } from './../shared/services/auth-guard/auth-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { ShoppingRoutingModule } from './shopping-routing.module';

@NgModule({
  declarations: [
    ShoppingCartComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    CheckoutComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CustomFormsModule,
    ShoppingRoutingModule
  ],
  providers: [
    AuthGuard
  ]
})
export class ShoppingModule { }
