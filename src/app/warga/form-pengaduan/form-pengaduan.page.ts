import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  standalone: false,
  selector: 'app-form-pengaduan',
  templateUrl: './form-pengaduan.page.html',
  styleUrls: ['./form-pengaduan.page.scss'],
})
export class FormPengaduanPage implements OnInit {
  showSuccessModal = false;

  formData: any = {
    tanggal: '',
    nik: '',
    kategori: 'Pengaduan',
    judul: '',
    deskripsi: '',
    status: 'Menunggu',
    file: null
  };

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit() {
    const today = new Date();
    this.formData.tanggal = today.toISOString().slice(0, 10);

    this.api.getCurrentUser().then(user => {
      this.formData.nik = user.nik;
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.formData.file = file;
  }

  async submitForm() {
  if (!this.formData.judul || !this.formData.nik) {
    alert('Jenis pengaduan dan NIK wajib diisi.');
    return;
  }

  try {
    const response = await (await this.api.kirimPermohonan(this.formData)).toPromise();

    console.log('Berhasil kirim:', response);
    this.showSuccessModal = true;
  } catch (err: any) {
    console.error('Gagal kirim:', err);
    if (err.error && err.error.errors) {
      alert(JSON.stringify(err.error.errors));
    } else {
      alert('Gagal mengirim pengaduan. Silakan cek input kamu.');
    }
  }
}


  closeModal() {
    this.showSuccessModal = false;
  }

  goToPengaduan() {
    this.closeModal();
    this.router.navigate(['/pengaduan']);
  }

  goToHome() {
    this.closeModal();
    this.router.navigate(['/warga/tabs/home']);
  }
}
