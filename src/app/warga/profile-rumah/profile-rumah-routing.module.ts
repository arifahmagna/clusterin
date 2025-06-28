import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileRumahPage } from './profile-rumah.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileRumahPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRumahPageRoutingModule {}
