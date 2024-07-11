import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DndDropEvent } from 'ngx-drag-drop';
import { CustomerService } from 'src/app/feature/customer/services/customer.service';
import { ProductService } from 'src/app/feature/product/product/services/product.service';

@Component({
  selector: 'app-list-transaction',
  templateUrl: './list-transaction.component.html',
  styleUrls: ['./list-transaction.component.scss']
})
export class ListTransactionComponent {
  // cities = ["Malang", "Surabaya", "Mojokerto"];
  listTransaction: any[] = [];
  selectedMenus: any[] = [];
  form: FormGroup;
  @Input() namaMenu: string;
  @Input() harga: number;

  quantity: number = 0;

  constructor(
    private customerService: CustomerService,
    private transactionService: ProductService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getTransaction();
    this.form = this.fb.group({
      menus: this.fb.array([]) // Form array for menus if needed
    });
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

  getTransaction() {
    this.transactionService.getProduct([]).subscribe((res: any) => {
      this.listTransaction = res.data.list;
    }), (err: any) => {
      console.log(err);
    }
  }

  onDragStart(event: DragEvent, item: any) {
    event.dataTransfer!.setData('text/plain', JSON.stringify(item));
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    const data = event.dataTransfer!.getData('text/plain');
    const droppedItem = JSON.parse(data);
    droppedItem.quantity = 1; // Default quantity when dropped
    this.selectedMenus.push(droppedItem);
    this.recalculate(); // Recalculate totals
  }

  // decreaseQuantity(index: number) {
  //   if (this.selectedMenus[index].quantity > 0) {
  //     this.selectedMenus[index].quantity--;
  //     this.recalculate();
  //   }
  // }

  // increaseQuantity(index: number) {
  //   if (this.selectedMenus[index].quantity < 10) { // Max quantity set to 10
  //     this.selectedMenus[index].quantity++;
  //     this.recalculate();
  //   }
  // }

  calculateSubtotal(): number {
    return this.selectedMenus.reduce((acc, menu) => acc + (menu.price * menu.quantity), 0);
  }

  calculateTax(): number {
    return this.calculateSubtotal() * 0.11;
  }

  calculateTotal(): number {
    return this.calculateSubtotal() + this.calculateTax();
  }

  recalculate() {
    // Recalculate totals when quantity changes
    this.selectedMenus.forEach(menu => {
      menu.subtotal = menu.price * menu.quantity;
    });
  }


}
