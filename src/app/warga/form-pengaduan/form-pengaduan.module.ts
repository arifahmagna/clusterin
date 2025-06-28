import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormPengaduanPageRoutingModule } from './form-pengaduan-routing.module';

import { FormPengaduanPage } from './form-pengaduan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormPengaduanPageRoutingModule
  ],
  declarations: [FormPengaduanPage]
})
export class FormPengaduanPageModule {}
