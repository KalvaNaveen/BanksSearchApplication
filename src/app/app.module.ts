import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BanksComponent } from './banks/banks.component';
import {MatInputModule,MatSelectModule,MatToolbarModule,MatTableModule,MatPaginatorModule,MatSortModule,MatCheckboxModule} from '@angular/material';
import { HeaderComponent } from './header/header.component';
import {CdkTableModule} from '@angular/cdk/table';
import { BankDetailsComponent } from './banks/bank-details/bank-details.component';
import {HttpClientModule} from '@angular/common/http';
const appRoutes: Routes = [
  { path: 'banks/:bank_id', component: BankDetailsComponent },
  {
    path: 'banks',
    component: BanksComponent,
  },
  { path: '',
    redirectTo: '/banks',
    pathMatch: 'full'}
];
@NgModule({
  declarations: [
    AppComponent,
    BanksComponent,
    HeaderComponent,
    BankDetailsComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    CdkTableModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
