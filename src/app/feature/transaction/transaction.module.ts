import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListTransactionComponent } from './components/list-transaction/list-transaction.component';
import { DndModule } from 'ngx-drag-drop';
import { AppComponent } from 'src/app/app.component';



@NgModule({
  declarations: [ListTransactionComponent, AppComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    DndModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class TransactionModule { }
