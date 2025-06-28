import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormPengaduanPage } from './form-pengaduan.page';

const routes: Routes = [
  {
    path: '',
    component: FormPengaduanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormPengaduanPageRoutingModule {}
