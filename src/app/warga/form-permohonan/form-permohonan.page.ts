import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
@Component({
  standalone: false,
  selector: 'app-form-permohonan',
  templateUrl: './form-permohonan.page.html',
  styleUrls: ['./form-permohonan.page.scss'],
})
export class FormPermohonanPage implements OnInit {
  showSuccessModal = false;

  formData: any = {
    nik: '',
    kategori: 'Permohonan',
    judul: '',
    deskripsi: '',
    status: 'Menunggu',
    file: null
  };

  constructor(private router: Router, private api: ApiService) { }




  closeModal() {
    this.showSuccessModal = false;
  }

  goToPermohonan() {
    this.closeModal();
    this.router.navigate(['/permohonan']);
  }

  goToHome() {
    this.closeModal();
    this.router.navigate(['/warga/tabs/home']);
  }


  ngOnInit() {
    const today = new Date();

    this.api.getCurrentUser().then(user => {
      this.formData.nik = user.nik;
    });

    this.formData.kategori = 'Permohonan';
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.formData.file = file;
  }
async submitForm() {
  if (!this.formData.judul || !this.formData.nik) {
    alert('Judul dan NIK wajib diisi.');
    return;
  }

  try {
    const formDataToSend = new FormData();
    formDataToSend.append('nik', this.formData.nik);
    formDataToSend.append('kategori', this.formData.kategori);
    formDataToSend.append('judul', this.formData.judul);
    formDataToSend.append('deskripsi', this.formData.deskripsi || '');
formDataToSend.append('status', this.formData.status); 

    if (this.formData.file) {
      formDataToSend.append('file', this.formData.file);
    }

    
    const entries = formDataToSend as any;
    if (entries.entries) {
      for (const pair of entries.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
    } else {
      console.warn('FormData.entries() not supported in this environment');
    }

    
    const response = await this.api.kirimPengajuan(formDataToSend);
    console.log('Berhasil:', response);
    this.showSuccessModal = true;

  } catch (err: any) {
  console.error('Gagal:', err);
  if (err.error && err.error.errors) {
    console.error('Detail error:', err.error.errors);

    let message = 'Validasi Gagal:\n';
    for (const key in err.error.errors) {
      if (err.error.errors.hasOwnProperty(key)) {
        message += `- ${key}: ${err.error.errors[key].join(', ')}\n`;
      }
    }
    alert(message);
  } else {
    alert('Gagal mengirim permohonan. Silakan cek input kamu.');
  }
}
}







}
