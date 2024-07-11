import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSalesComponent } from './components/list-sales/list-sales.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    ListSalesComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ]
})
export class SalesModule { }
