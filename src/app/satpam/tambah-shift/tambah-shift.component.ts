import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tambah-shift',
  templateUrl: './tambah-shift.component.html',
  styleUrls: ['./tambah-shift.component.scss'],
  standalone: false,
})
export class TambahShiftComponent {
  newShift = {
    name: '',
    petugas: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    location: '',
    notes: ''
  };

  constructor(private modalCtrl: ModalController) {}

  saveShift() {
    console.log('Shift disimpan:', this.newShift);
    this.modalCtrl.dismiss(this.newShift); // Kirim data ke parent
  }

  cancel() {
    this.modalCtrl.dismiss(); // Tutup modal tanpa kirim data
  }



}
