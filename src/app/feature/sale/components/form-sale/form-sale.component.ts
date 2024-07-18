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
    private landaService: LandaService,
  ) {
    // this.formModel = {
    //   date: "2024-06-20",
    //   m_customer_id: "ef09626f-05db-4ef8-a1ed-cad4e382a3c9",
    //   product_detail: [
    //     {
    //       m_product_id: "f55a105c-b4a0-41f8-8311-42ef27675ec8",
    //       m_product_detail_id: "56feeef7-5d76-46fc-b3e4-6e00d6ff2ee9",
    //       total_item: 1,
    //       price: 10000,
    //       is_added: true,
    //     },
    //   ],
    // };
    this.formModel = {
      date: '',
      m_customer_id: '',
      product_detail: []
    };
  }

  ngOnInit(): void {
    this.initializeFormModel();
  }

  private initializeFormModel(): void {
    // Check if selectedMenu has data and assign it to formModel
    if (this.selectedMenu.length > 0) {
      this.formModel = {
        date: '2024-06-20', // Set date as per your logic or source
        m_customer_id: 'ef09626f-05db-4ef8-a1ed-cad4e382a3c9', // Set customer ID as per your logic or source
        product_detail: this.selectedMenu.map(menuItem => ({
          m_product_id: menuItem.m_product_id,
          m_product_detail_id: menuItem.m_product_detail_id,
          total_item: menuItem.total_item,
          price: menuItem.price,
          is_added: menuItem.is_added,
        }))
      };
    } else {
      // Handle the case where selectedMenu is empty if needed
      console.warn('selectedMenu is empty or not provided.');
    }
  }

  activeMode: string;
  formModel: {
    date: string;
    m_customer_id: string;
    product_detail: {
      m_product_id: string;
      m_product_detail_id: string;
      total_item: number;
      price: number;
      is_added: boolean;
    }[];
  };
  isDisabledForm: boolean = false;

  save() {
    this.MODE_CREATE;
    this.insert();
    console.log('disave', this.formModel);
  }

  insert() {
    // Start loading progress
    this.progressService.startLoading();

    // Call the createSale method of saleService and subscribe to the observable
    this.saleService.createSale(this.formModel).subscribe(
      (response) => {
        // Handle the response if needed
        console.log('Hasil simpan:', response);
        this.progressService.finishLoading();
      },
      (error) => {
        // Handle the error if any
        console.error('Error simpan:', error);
        this.progressService.finishLoading();
      }
    );
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
