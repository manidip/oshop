import { NgModule } from '@angular/core';

import { AuthGuard } from './../shared/services/auth-guard/auth-guard.service';
import { SharedModule } from './../shared/shared.module';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductFilterComponent } from './components/products-filter/product-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ShoppingRoutingModule } from './shopping-routing.module';

@NgModule({
  declarations: [
    ShoppingCartComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    CheckoutComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    ProductsComponent,
    ProductFilterComponent,
    OrderDetailsComponent
  ],
  imports: [
    SharedModule,
    ShoppingRoutingModule
  ],
  providers: [
    AuthGuard
  ]
})
export class ShoppingModule { }
