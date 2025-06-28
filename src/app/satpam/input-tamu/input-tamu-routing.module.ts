import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InputTamuPage } from './input-tamu.page';

const routes: Routes = [
  {
    path: '',
    component: InputTamuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InputTamuPageRoutingModule {}
