import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
// import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarModule, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FeatureRoutingModule } from './feature-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserModule } from './user/user.module';
import { TestModule } from './test/test.module';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { ListTransactionComponent } from './transaction/components/list-transaction/list-transaction.component';
import { SalesModule } from './sales/sales.module';
import { ListSaleComponent } from './sale/components/list-sale/list-sale.component';
import { FormSaleComponent } from './sale/components/form-sale/form-sale.component';
import { SaleModule } from './sale/sale.module';
import { SalesPromoComponent } from './report/components/sales-promo/sales-promo.component';
import { ReportModule } from './report/report.module';

// const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
//     suppressScrollX: true,
//     wheelSpeed: 0.3
// };

@NgModule({
    declarations: [DashboardComponent, ListTransactionComponent, SalesPromoComponent, ],
    imports: [
        ReactiveFormsModule,
        NgbAlertModule,
        CommonModule,
        FeatureRoutingModule,
        // PerfectScrollbarModule,
        UserModule,
        CustomerModule,
        ProductModule,
        TestModule,
        SalesModule,
        SaleModule,
        ReportModule,
    ],
    // providers: [
    //     {
    //         provide: PERFECT_SCROLLBAR_CONFIG,
    //         useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    //     }
    // ]
})
export class FeatureModule { }
