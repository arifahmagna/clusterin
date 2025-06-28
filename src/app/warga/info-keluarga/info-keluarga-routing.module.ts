import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoKeluargaPage } from './info-keluarga.page';

const routes: Routes = [
  {
    path: '',
    component: InfoKeluargaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoKeluargaPageRoutingModule {}
