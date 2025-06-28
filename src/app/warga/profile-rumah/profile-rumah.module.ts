import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileRumahPageRoutingModule } from './profile-rumah-routing.module';

import { ProfileRumahPage } from './profile-rumah.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileRumahPageRoutingModule
  ],
  declarations: [ProfileRumahPage]
})
export class ProfileRumahPageModule {}
