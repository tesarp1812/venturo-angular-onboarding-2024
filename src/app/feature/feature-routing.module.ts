import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormUserComponent } from './user/components/form-user/form-user.component';
import { TestComponentRenderer } from '@angular/core/testing';
import { TestDirectiveComponent } from './test/components/test-directive/test-directive.component';
import { ListUserComponent } from './user/components/list-user/list-user.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: DashboardComponent ,pathMatch: 'full'},
    { path: 'user', component: ListUserComponent ,pathMatch: 'full' },
    { path: 'test', component: TestDirectiveComponent ,pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeatureRoutingModule { }
