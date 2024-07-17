import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProgressServiceService } from 'src/app/core/services/progress-service.service';
import { ProductService } from 'src/app/feature/product/product/services/product.service';
import { UserService } from 'src/app/feature/user/services/user.service';
import { SaleService } from '../../services/sale.service';
import { LandaService } from 'src/app/core/services/landa.service';

@Component({
  selector: 'app-form-sale',
  templateUrl: './form-sale.component.html',
  styleUrls: ['./form-sale.component.scss']
})
export class FormSaleComponent implements OnInit {
  quantity: number = 0;
  @Input() selectedMenu: any = [];
  @Input() selectedCustomer: any;
  @Output() afterSave = new EventEmitter<boolean>();

  readonly MODE_CREATE = "add";
  readonly MODE_UPDATE = "update";

  constructor(
    private userService: UserService,
    private saleService: SaleService,
    private progressService: ProgressServiceService,
    private landaService: LandaService
  ) { }

  ngOnInit(): void {
    
  }

  activeMode: string;
  formModel: {
    date: Date;
    m_customer_id: string;
    product_details:[
      {
        m_product_id: string;
        m_product_detail_id: string;
        total_item: number;
        price: number;
        is_added: true
      }
    ]
  };
  isDisabledForm: boolean = false;

  save(){
    console.log('disave');
  }

  decreaseQuantity(menu: any) {
    if (menu.quantity > 0) {
      menu.quantity--;
    }
  }

  calculateSubtotal(): number {
    return this.selectedMenu.reduce((acc, menu) => acc + (menu.price * menu.quantity), 0);
  }

  calculateTax(): number {
    return this.calculateSubtotal() * 0.11;
  }

  calculateTotal(): number {
    return this.calculateSubtotal() + this.calculateTax();
  }
}
