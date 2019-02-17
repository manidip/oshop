import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotAllowedComponent } from './components/not-allowed/not-allowed.component';

@NgModule({
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent,
    NotAllowedComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forRoot([
      {path: 'restricted', component: NotAllowedComponent}
    ])
  ],
  exports: [
    BsNavbarComponent,
  ]
})
export class CoreModule { }
