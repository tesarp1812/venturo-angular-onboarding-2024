import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormUserComponent } from './user/components/form-user/form-user.component';
import { TestComponentRenderer } from '@angular/core/testing';
import { TestDirectiveComponent } from './test/components/test-directive/test-directive.component';
import { ListUserComponent } from './user/components/list-user/list-user.component';
import { FormCustomerComponent } from './customer/components/form-customer/form-customer.component';
import { ListCustomerComponent } from './customer/components/list-customer/list-customer.component';
import { ListProductComponent } from './product/product/components/list-product/list-product.component';
import { ListCategoryComponent } from './product/category/components/list-category/list-category.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: DashboardComponent ,pathMatch: 'full'},
    { path: 'user', component: ListUserComponent ,pathMatch: 'full' },
    { path: 'test1', component: FormUserComponent ,pathMatch: 'full' },
    { path: 'test', component: TestDirectiveComponent ,pathMatch: 'full' },
    { path: 'customer', component: ListCustomerComponent ,pathMatch: 'full' },
    { path: 'category', component: ListCategoryComponent, pathMatch: 'full'},
    { path: 'product', component: ListProductComponent, pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeatureRoutingModule { }
