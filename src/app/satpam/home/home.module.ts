import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SimpleSweeperComponent } from '../simple-sweeper/simple-sweeper.component';


import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';





@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SimpleSweeperComponent,
    
  ],
  declarations: [HomePage, ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 

})
export class HomePageModule {}
