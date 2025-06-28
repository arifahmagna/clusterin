import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LayananPageRoutingModule } from './layanan-routing.module';

import { LayananPage } from './layanan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LayananPageRoutingModule
  ],
  declarations: [LayananPage]
})
export class LayananPageModule {}
