import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { LandaService } from 'src/app/core/services/landa.service';
import { ProgressServiceService } from 'src/app/core/services/progress-service.service';

@Component({
  selector: 'app-form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.scss']
})
export class FormCustomerComponent implements OnInit {
  name: string;

  @Input() customerId: number;
  @Output() afterSave = new EventEmitter<boolean>();

  readonly MODE_CREATE = "add";
  readonly MODE_UPDATE = "update";

  constructor(
    private customerService: CustomerService,
    private landaService: LandaService,
    private progressService: ProgressServiceService
  ) { }
  ngOnInit(): void {
    this.resetForm();
  }

  activeMode: string;
  formModel: {
    id: number;
    name: string;
    email: string;
    password: string;
    phone_number: string;
  };
  isDisabledForm: boolean = false;

  getCustomer(customerId) {
    this.customerService.getCustomerById(customerId).subscribe(
      (res: any) => {
        console.log(res.data);
        this.formModel = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  resetForm() {
    // this.getRoles();
    this.formModel = {
      id: 0,
      name: '',
      email: '',
      password: '',
      phone_number: '',
    }
    if (this.customerId != 0) {
      this.activeMode = this.MODE_UPDATE;
      this.getCustomer(this.customerId);
      return true;
    }

    this.activeMode = this.MODE_CREATE;
  }

  save() {
    switch (this.activeMode) {
      case this.MODE_CREATE:
        this.insert();
        break;
      case this.MODE_UPDATE:
        this.update();
        break;
    }
  }

  insert() {
    this.isDisabledForm = true;
    this.progressService.startLoading();
    this.customerService.createCustomer(this.formModel).subscribe(
      (res: any) => {
        this.landaService.alertSuccess("Berhasil", res.message);
        this.afterSave.emit();
        this.progressService.finishLoading();
        this.isDisabledForm = false;
      },
      (err) => {
        this.landaService.alertError("Mohon Maaf", err.error.errors);
        this.progressService.finishLoading();
        this.isDisabledForm = false;
      }
    );
  }

  update() {
    this.isDisabledForm = true;
    this.progressService.startLoading();
    this.customerService.updateCustomer(this.formModel).subscribe(
      (res: any) => {
        this.landaService.alertSuccess("Berhasil", res.message);
        this.afterSave.emit();
        this.progressService.finishLoading();
        this.isDisabledForm = false;
      },
      (err) => {
        this.landaService.alertError("Mohon Maaf", err.error.errors);
        this.progressService.finishLoading();
        this.isDisabledForm = false;
      }
    );
  }

  ngOnChanges(changes: SimpleChange) {
    this.resetForm();
  }

}
