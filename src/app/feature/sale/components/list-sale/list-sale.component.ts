import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CustomerService } from 'src/app/feature/customer/services/customer.service';
import { ProductService } from 'src/app/feature/product/product/services/product.service';

@Component({
  selector: 'app-list-sale',
  templateUrl: './list-sale.component.html',
  styleUrls: ['./list-sale.component.scss']
})
export class ListSaleComponent implements OnInit {
  listSale: any;
  listCustomer: any;
  quantity: number = 0;
  selectedMenu: any = [];
  selectedCustomer: any;
  totalPayment: number = 0;
  // @Output() afterSave = new EventEmitter<boolean>();

  titleForm: string;
  productId: number;
  showForm: boolean;

  constructor(
    private saleService: ProductService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.showForm = false;
    this.getProduct();
    this.getCustomers();
  }

  getProduct() {
    this.saleService.getProduct([]).subscribe((res: any) => {
      this.listSale = res.data.list;
      console.log('data product :', this.listSale);
    }), (err: any) => {
      console.log(err);
    }
  }

  getCustomers() {
    this.customerService.getCustomers([]).subscribe((res: any) => {
      this.listCustomer = res.data.list;
      console.log('data customers :', this.listCustomer);
    }), (err: any) => {
      console.log(err);
    }
  }

  addToOrder(item: any) {
    // Check if item is already in selectedMenu
    const index = this.selectedMenu.findIndex(menu => menu.id === item.id);

    if (index !== -1) {
      this.selectedMenu[index].quantity++;
    } else {
      this.selectedMenu.push({ ...item, quantity: 1 });
    }
    console.log("selected menu", this.selectedMenu);
  }

  selectCustomer(cus: any) {
    this.selectedCustomer = cus;
    console.log('Selected Customer:', this.selectedCustomer);
  }

  formUpdate(product) {
    this.showForm = true;
    this.titleForm = 'Edit Product: ' + product.name;
    this.productId = product.id;
    console.log('edit', product);
  }

}
