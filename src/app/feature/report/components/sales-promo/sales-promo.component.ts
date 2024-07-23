import { Component } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { CustomerService } from 'src/app/feature/customer/services/customer.service';

@Component({
  selector: 'app-sales-promo',
  templateUrl: './sales-promo.component.html',
  styleUrls: ['./sales-promo.component.scss']
})
export class SalesPromoComponent {
  filter: {
    start_date: string,
    end_date: string,
    customer_id: string,
    promo_id: string
  }
  showLoading: boolean;
  customers: [];
  promos: [];
  sales: [];

  constructor(
    private salesService: SalesService,
    private customerService: CustomerService,
    // private promoService: promoser
  ) { }
}
