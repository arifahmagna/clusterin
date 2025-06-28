import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormPermohonanPage } from './form-permohonan.page';

const routes: Routes = [
  {
    path: '',
    component: FormPermohonanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormPermohonanPageRoutingModule {}
