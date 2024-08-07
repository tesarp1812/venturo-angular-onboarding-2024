import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { LandaService } from 'src/app/core/services/landa.service';
import { ProgressServiceService } from 'src/app/core/services/progress-service.service';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoryService } from '../../../category/services/category.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent {

  readonly DEFAULT_STATUS = '1';
  readonly DEFAULT_TYPE = 'Toping';
  readonly MODE_CREATE = 'add';
  readonly MODE_UPDATE = 'update';

  @Input() productId: number;
  @Output() afterSave = new EventEmitter<boolean>();

  configEditor = ClassicEditor;

  constructor(
    private productService: ProductService,
    private landaService: LandaService,
    private progressService: ProgressServiceService,
    private sanitizer: DomSanitizer,
    private categoriesService: CategoryService
  ) { }

  croppedImage: any;
  imageChangedEvent: any;
  activeMode: string;
  categories: any[];
  showLoading: boolean = true;
  formModel: {
    id: number,
    name: string,
    price: number,
    product_category_id: string,
    product_category_name: string,
    description: string,
    photo_url: string,
    details: any[],
    details_deleted: any[],
    is_available: string
  }
  isDisabledForm: boolean = false;


  ngOnInit(): void {
    this.resetForm();
    this.getCategories();
  }


  resetForm() {
    this.formModel = {
      id: 0,
      name: '',
      price: 0,
      product_category_id: '',
      product_category_name: '',
      description: '',
      photo_url: 'http://localhost/storage/../assets/img/no-image.png',
      details: [],
      details_deleted: [],
      is_available: ''
    };

    if (this.productId !== 0) {
      this.activeMode = this.MODE_UPDATE;
      this.getProduct(this.productId);
    } else {
      this.activeMode = this.MODE_CREATE;
    }
  }

  getProduct(productId) {
    this.productService.getProduct(productId).subscribe((res: any) => {
      this.formModel = res.data;
    }, err => {
      console.error(err);
    });
  }

  getCategories(name = '') {
    this.showLoading = true;
    this.categoriesService.getCategories({ name: name }).subscribe((res: any) => {
      this.categories = res.data.list;
      this.showLoading = false;
      console.log('categories:', this.categories)
    }, err => {
      console.log(err);
    });
  }

  save() {
    switch (this.activeMode) {
      case this.MODE_CREATE:
        console.log('disave', this.formModel);
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
    this.productService.createProduct(this.formModel).subscribe((res: any) => {
      this.landaService.alertSuccess('Berhasil', res.message);
      this.afterSave.emit();
      this.progressService.finishLoading();
      this.isDisabledForm = false;
    }, err => {
      console.log('Error occurred:', err);
      this.landaService.alertError('Mohon Maaf', err.error.errors);
      this.progressService.finishLoading();
      this.isDisabledForm = false;
    });
  }

  update() {
    this.isDisabledForm = true;
    this.progressService.startLoading();
    this.productService.updateProduct(this.formModel).subscribe((res: any) => {
      this.landaService.alertSuccess('Berhasil', res.message);
      this.afterSave.emit();
      this.progressService.finishLoading();
      this.isDisabledForm = false;
    }, err => {
      this.landaService.alertError('Mohon Maaf', err.error.errors);
      this.progressService.finishLoading();
      this.isDisabledForm = false;
    });
  }

  addDetail() {
    let val = {
      is_added: true,
      description: '',
      type: this.DEFAULT_TYPE,
      price: 0,
    }
    this.formModel.details.push(val);
  }

  removeDetail(details: any[], paramIndex: number) {
    details.splice(paramIndex, 1);
    if (details[paramIndex]?.id) {
      this.formModel.details_deleted.push(details[paramIndex]);
    }
  }

  changeDetail(detail: any) {
    if (detail?.id) {
      detail.is_updated = true;
    }
  }

  getCroppedImage($event) {
    this.formModel.photo_url = $event;
   }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    // event.blob can be used to upload the cropped image
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

}
