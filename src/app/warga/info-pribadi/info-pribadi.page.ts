import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-info-pribadi',
  templateUrl: './info-pribadi.page.html',
  styleUrls: ['./info-pribadi.page.scss'],
})
export class InfoPribadiPage implements OnInit {
  editMode = false;
  showSuccessModal = false;

  data = {
    nik: '3213524098675437',
    namaLengkap: 'Delia Widianti',
    tempatLahir: 'Bandung',
    tanggalLahir: '1985-03-12',
    noHp: '081234567890',
    jenisKelamin: 'Perempuan'
  };

  constructor(private router: Router) {}

  toggleEdit() {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      console.log('Data disimpan:', this.data);
      this.showSuccessModal = true;
    }
  }

  kembaliKeProfil() {
    this.showSuccessModal = false;
    this.router.navigate(['/warga/tabs/profile']);
  }

  kembaliKeBeranda() {
    this.showSuccessModal = false;
    this.router.navigate(['/warga/tabs/home']);
  }

  kembali() {
    this.router.navigate(['/warga/tabs/profile']);
  }

  ngOnInit() {}
}
