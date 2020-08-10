import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HttpClientModule} from'@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



import {AuthModule } from './auth/auth.module';
import {MainModule} from './main/main.module';

import { AppComponent } from './app.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'auth'}
];

@NgModule({
  declarations: [
    AppComponent 
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AuthModule,
    MainModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
