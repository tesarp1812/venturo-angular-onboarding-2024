import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCustomerComponent } from './components/form-customer/form-customer.component';
import { ListCustomerComponent } from './components/list-customer/list-customer.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations: [
    FormCustomerComponent,
    ListCustomerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    NgbModule
  ]
})
export class CustomerModule { }
