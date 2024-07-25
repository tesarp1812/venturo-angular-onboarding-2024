import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SalesPromoComponent } from './components/sales-promo/sales-promo.component';
import { SalesMenuComponent } from './components/sales-menu/sales-menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [SalesPromoComponent, SalesMenuComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    SharedModule,
    NgSelectModule
  ]
})
export class ReportModule { }
