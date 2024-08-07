import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProgressServiceService } from 'src/app/core/services/progress-service.service';
import { ProductService } from 'src/app/feature/product/product/services/product.service';
import { UserService } from 'src/app/feature/user/services/user.service';
import { SaleService } from '../../services/sale.service';
import { LandaService } from 'src/app/core/services/landa.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from 'src/app/feature/customer/services/customer.service';

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

  listCustomer: any;
  formCustomer: any;
  titleModal: string;
  customerId: number;

  readonly MODE_CREATE = "add";
  readonly MODE_UPDATE = "update";

  constructor(
    private userService: UserService,
    private saleService: SaleService,
    private progressService: ProgressServiceService,
    private landaService: LandaService,
    private modalService: NgbModal,
    private customerService: CustomerService
  ) { }

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

  getCustomers() {
    this.customerService.getCustomers([]).subscribe((res: any) => {
      this.listCustomer = res.data.list;
      console.log('data customers test:', this.listCustomer);
    }), (err: any) => {
      console.log(err);
    }
  }

  updateCustomer(modalId, selectedCustomer) {
    this.titleModal = 'Edit Customer: ' + selectedCustomer.name;
    this.customerId = selectedCustomer.id;
    this.modalService.open(modalId, { size: 'lg', backdrop: 'static' });
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
