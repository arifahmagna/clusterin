import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageModule } from './home/home.module';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { SimpleSweeperComponent } from './simple-sweeper/simple-sweeper.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TambahShiftComponent } from 'src/app/satpam/tambah-shift/tambah-shift.component';
import { EditShiftComponent } from 'src/app/satpam/edit-shift/edit-shift.component';
import { ShiftComponent } from 'src/app/satpam/laporan/shift/shift.component';
import { KunjunganComponent } from './laporan/kunjungan/kunjungan.component';
import { CheckInComponent } from './status/check-in/check-in.component';
import { CheckOutComponent } from './status/check-out/check-out.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { InformasiPribadiComponent } from './profile/informasi-pribadi/informasi-pribadi.component';
import { ProfilePageModule } from './profile/profile.module';



// import { HomePage } from './home.page';






@NgModule({
  declarations: [
    // HomePage,
    SimpleSweeperComponent,
     ShiftComponent,
  TambahShiftComponent,
  EditShiftComponent,
  KunjunganComponent,
  CheckInComponent,
  CheckOutComponent,
  EditProfileComponent,
   ProfilePageModule,
   InformasiPribadiComponent
  



  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SatpamModule { }
