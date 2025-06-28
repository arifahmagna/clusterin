import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { InformasiPribadiComponent } from './informasi-pribadi/informasi-pribadi.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,

    
  ],
  declarations: [ ProfilePage, EditProfileComponent,InformasiPribadiComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfilePageModule {}
