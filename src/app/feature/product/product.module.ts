import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCategoryComponent } from './category/components/list-category/list-category.component';
import { ListProductComponent } from './product/components/list-product/list-product.component';
import { FormsModule, NgSelectOption } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { CKEditorModule} from '@ckeditor/ckeditor5-angular';
import { DndModule } from 'ngx-drag-drop';
import { FormCategoryComponent } from './category/components/form-category/form-category.component';
import { FormProductComponent } from './product/components/form-product/form-product.component';



@NgModule({
  declarations: [
    ListCategoryComponent,
    ListProductComponent,
    FormCategoryComponent,
    FormProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    DataTablesModule,
    // NgSelectOption,
    SharedModule,
    CoreModule,
    // CKEditorModule,
    DndModule
  ]
})
export class ProductModule { }
