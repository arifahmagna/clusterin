import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { InformasiPribadiComponent } from './informasi-pribadi/informasi-pribadi.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  },

  {
    path: 'edit-profile',
    component: EditProfileComponent
  },

  {
     path: 'informasi-pribadi',
    component: InformasiPribadiComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
