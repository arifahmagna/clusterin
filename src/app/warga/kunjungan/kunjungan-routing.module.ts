import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KunjunganPage } from './kunjungan.page';

const routes: Routes = [
  {
    path: '',
    component: KunjunganPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KunjunganPageRoutingModule {}
