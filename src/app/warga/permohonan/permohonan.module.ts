import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PermohonanPageRoutingModule } from './permohonan-routing.module';

import { PermohonanPage } from './permohonan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PermohonanPageRoutingModule
  ],
  declarations: [PermohonanPage]
})
export class PermohonanPageModule {}
