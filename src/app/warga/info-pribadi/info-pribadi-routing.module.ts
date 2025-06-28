import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoPribadiPage } from './info-pribadi.page';

const routes: Routes = [
  {
    path: '',
    component: InfoPribadiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoPribadiPageRoutingModule {}
