import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ShiftPageRoutingModule } from './shift-routing.module';
import { ShiftPage } from './shift.page';
import { Routes, RouterModule } from '@angular/router';







const routes: Routes = [
  {
    path : '',
    component : ShiftPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShiftPageRoutingModule,
    RouterModule.forChild(routes)
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
  declarations: [ShiftPage
] // Pastikan ShiftPage dideklarasikan di sini
})
export class ShiftPageModule {}
