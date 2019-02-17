import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AuthGuard } from '../shared/services/auth-guard/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard/admin-auth-guard.service';
import { AdminOrderDetailsComponent } from './components/admin-order-details/admin-order-details.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';

const routes: Routes = [
  {path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
  {path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
  {path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard]},
  {path: 'admin/orders/:id', component: AdminOrderDetailsComponent, canActivate: [AuthGuard, AdminAuthGuard]},
  {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }