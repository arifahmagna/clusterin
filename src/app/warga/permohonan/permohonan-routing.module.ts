import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermohonanPage } from './permohonan.page';

const routes: Routes = [
  {
    path: '',
    component: PermohonanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermohonanPageRoutingModule {}
