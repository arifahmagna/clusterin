import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KunjunganPageRoutingModule } from './kunjungan-routing.module';

import { KunjunganPage } from './kunjungan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KunjunganPageRoutingModule
  ],
  declarations: [KunjunganPage]
})
export class KunjunganPageModule {}
