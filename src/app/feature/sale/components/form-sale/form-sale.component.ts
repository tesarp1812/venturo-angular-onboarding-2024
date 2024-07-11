import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-sale',
  templateUrl: './form-sale.component.html',
  styleUrls: ['./form-sale.component.scss']
})
export class FormSaleComponent implements OnInit {

  quantity: number = 0;
  @Input() selectedMenu: any = [];
  @Input() selectedCustomer: any;


  constructor() {

  }

  ngOnInit(): void {

  }

  increaseQuantity(menu: any) {
    menu.quantity++;
    console.log(menu.quantity);
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
