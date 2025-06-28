import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormPermohonanPageRoutingModule } from './form-permohonan-routing.module';

import { FormPermohonanPage } from './form-permohonan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormPermohonanPageRoutingModule
  ],
  declarations: [FormPermohonanPage]
})
export class FormPermohonanPageModule {}
