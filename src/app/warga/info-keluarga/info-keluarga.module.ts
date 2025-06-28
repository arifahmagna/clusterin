import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoKeluargaPageRoutingModule } from './info-keluarga-routing.module';

import { InfoKeluargaPage } from './info-keluarga.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoKeluargaPageRoutingModule
  ],
  declarations: [InfoKeluargaPage]
})
export class InfoKeluargaPageModule {}
