import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { LandaService } from 'src/app/core/services/landa.service';
import { ProgressServiceService } from 'src/app/core/services/progress-service.service';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss']
})
export class FormCategoryComponent implements OnInit {

  @Input() categoryId: number;
  @Output() afterSave = new EventEmitter<boolean>();

  readonly MODE_CREATE = 'add';
  readonly MODE_UPDATE = 'update';

  constructor(
    private categoryService: CategoryService,
    private landaService: LandaService,
    private progressService: ProgressServiceService
  ) { }

  activeMode: string;
  formModel: {
    id: number,
    name: string,
  }
  isDisabledForm: boolean = false;


  ngOnInit(): void {
    this.resetForm();
  }


  resetForm() {
    this.formModel = {
      id: 0,
      name: '',
    }

    if (this.categoryId != 0) {
      this.activeMode = this.MODE_UPDATE;
      this.getCategory(this.categoryId);
      return true;
    }
    
    this.activeMode = this.MODE_CREATE;
  }

  getCategory(categoryId) {
    this.categoryService.getCategoryById(categoryId).subscribe((res: any) => {
      this.formModel = res.data;
    }, err => {
      console.log(err);
    });
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
    this.categoryService.createCategory(this.formModel).subscribe((res: any) => {
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

  update() {
    this.isDisabledForm = true;
    this.progressService.startLoading();
    this.categoryService.updateCategory(this.formModel).subscribe((res: any) => {
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


}
