import { Component, ViewChild } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent {
  listCustomer: any;
  formCustomer: any;
  titleModal: string;
  customerId: number;

  filter: {
    nama: ''
  };


  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtOptions: any;

  constructor(
    private customerService: CustomerService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.setDefault();
    this.getCustomer();
  }

  getCustomer() {
    this.dtOptions = {
      serverSide: true,
      processing: true,
      ordering: false,
      pageLength: 3,
      ajax: (dtParams: any, callback) => {
        const params = {
          ...this.filter,
          per_page: dtParams.length,
          page: (dtParams.start / dtParams.length) + 1,
        };

        this.customerService.getCustomers(params).subscribe((res: any) => {
          const { list, meta } = res.data;

          let number = dtParams.start + 1;
          list.forEach(val => {
            val.no = number++;
          });
          this.listCustomer = list;

          callback({
            recordsTotal: meta.total,
            recordsFiltered: meta.total,
            data: [],
          });

        }, (err: any) => {

        });
      },
    };
  }


  reloadDataTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  setDefault() {
    this.filter = {
      nama: ''
    }
  }

  createCustomer(modalId) {
    this.titleModal = 'Tambah User';
    this.customerId = 0;
    this.modalService.open(modalId, { size: 'lg', backdrop: 'static' });
  }

  updateCustomer(modalId, customer) {
    this.titleModal = 'Edit Customer: ' + customer.name;
    this.customerId = customer.id;
    this.modalService.open(modalId, { size: 'lg', backdrop: 'static' });
  }


  deleteCustomer(customerId) {
    Swal.fire({
      title: 'Apakah kamu yakin ?',
      text: 'Customer ini tidak dapat login setelah kamu menghapus datanya',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Ya, Hapus data ini !',
    }).then((result) => {
      if (!result.value) return false;

      this.customerService.deleteCustomer(customerId).subscribe((res: any) => {
        this.getCustomer();
      });
    });
  }



}
