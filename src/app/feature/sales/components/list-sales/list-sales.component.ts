import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../service/sales.service';
import { ProductService } from 'src/app/feature/product/product/services/product.service';
import { CustomerService } from 'src/app/feature/customer/services/customer.service';

@Component({
  selector: 'app-list-sales',
  templateUrl: './list-sales.component.html',
  styleUrls: ['./list-sales.component.scss']
})
export class ListSalesComponent implements OnInit {
  listSales: any;
  listProduct: any;
  listCustomers: any;
  // productMap: { [key: string]: string };

  constructor(
    private salesService: SalesService,
    private productService: ProductService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.loadProduct();
    this.getSales();
    this.loadCustomers();
  }

  getSales() {
    this.salesService.getSales([]).subscribe((res: any) => {
      this.listSales = res.data.list;
      console.log('sales : ', this.listSales)
    }, (err: any) => {
      console.log(err);
    });
  }


  loadProduct() {
    this.productService.getProduct([]).subscribe((res: any) => {
      this.listProduct = res.data.list;
      console.log('product :', this.listProduct);
    }, (err: any) => {
      console.log(err);
    });
  }  

  loadCustomers(){
    this.customerService.getCustomers([]).subscribe((res:any)=> {
      this.listCustomers = res.data.list;
      console.log('customers :', this.listCustomers);
    }, (err: any)=> {
      console.log(err);
    })
  }

  getProductName(productId: string): string {
    const product = this.listProduct.find(p => p.id === productId);
    return product ? product.name : 'Unknown Product';
  }

  getCustomerName(customerId: string): string {
    if (!this.listCustomers) {
      return 'Loading...'; // Atau nilai default jika data pelanggan belum tersedia
    }
    const customers = this.listCustomers.find(c => c.id === customerId);
    return customers ? customers.name : 'Unknown Product';
  }
  

}
