import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InputTamuPageRoutingModule } from './input-tamu-routing.module';

import { InputTamuPage } from './input-tamu.page';
// yg ditambahin
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InputTamuPageRoutingModule,
    // yang ditambahin 

    ReactiveFormsModule
  ],
  declarations: [InputTamuPage]
})
export class InputTamuPageModule {}
