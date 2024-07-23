import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/shared/shared.module';
import { SalesPromoComponent } from './components/sales-promo/sales-promo.component';



@NgModule({
  declarations: [SalesPromoComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    SharedModule
  ]
})
export class ReportModule { }
