import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlansFormComponent } from './plans-form-component/plans-form-component';

const routes: Routes = [
  {
    path: 'new',
    component: PlansFormComponent,
  },
  {
    path: 'edit/:id',
    component: PlansFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlansRoutingModule { }
