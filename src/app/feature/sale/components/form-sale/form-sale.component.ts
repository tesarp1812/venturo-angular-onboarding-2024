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
    this.formModel = {
      date: "2024-06-20",
      m_customer_id: "ef09626f-05db-4ef8-a1ed-cad4e382a3c9",
      product_detail: [
        {
          m_product_id: "f55a105c-b4a0-41f8-8311-42ef27675ec8",
          m_product_detail_id: "56feeef7-5d76-46fc-b3e4-6e00d6ff2ee9",
          total_item: 1,
          price: 10000,
          is_added: true,
        },
      ],
    };
  }

  ngOnInit(): void {
    
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
    this.saleService.createSale(this.formModel);
    this.saleService.createSale(this.formModel).subscribe(
      (res: any) => {
        this.landaService.alertSuccess("Berhasil", res.message);
        this.resetForm();
        this.afterSave.emit();
      },
      (err) => {
        this.landaService.alertError("Mohon Maaf", err.error.errors);
      }
    );
  }


  resetForm() {
    this.selectedMenu=[];
    this.selectedCustomer=null;
    this.ngOnInit();
  }
  
  currentDate = new Date();
  year = this.currentDate.getFullYear();
  month = String(this.currentDate.getMonth() + 1).padStart(2, "0");
  day = String(this.currentDate.getDate()).padStart(2, "0");
  formattedDate = `${this.year}-${this.month}-${this.day}`;
  
  insert() {
    this.formModel = {
      date: this.formattedDate,
      m_customer_id: this.selectedCustomer.id,
      product_detail: this.selectedMenu.map(menu=>{
        return{
          m_product_id: menu.id,
          m_product_detail_id: menu.details.length == 0 ? null : menu.details[0].id,
          total_item: menu.quantity || 0,
          price: menu.price,
          is_added: true,
        }
      }) 
    }
  }

  increaseQuantity(menu: any) {
  if (menu.quantity >= 0) {
    menu.quantity++;
  }
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
