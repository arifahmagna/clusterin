import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoPribadiPageRoutingModule } from './info-pribadi-routing.module';

import { InfoPribadiPage } from './info-pribadi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoPribadiPageRoutingModule
  ],
  declarations: [InfoPribadiPage]
})
export class InfoPribadiPageModule {}
