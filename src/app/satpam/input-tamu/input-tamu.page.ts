import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Storage } from '@ionic/storage-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-input-tamu',
  templateUrl: './input-tamu.page.html',
  styleUrls: ['./input-tamu.page.scss'],
})
export class InputTamuPage implements OnInit {
  tamuForm: FormGroup;
  idSatpam: string = '';

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private storage: Storage
  ) {
    this.tamuForm = this.fb.group({
      fullname: ['', Validators.required],
      nik: ['', Validators.required],
      address: ['', Validators.required],
      destination: ['', Validators.required],
      reason: ['', Validators.required],
      checkin: ['', Validators.required],      
      estimation: ['', Validators.required],   
    });
  }

  async ngOnInit() {
    await this.storage.create();
    const user = await this.storage.get('user');
    if (user?.nik) {
      this.idSatpam = user.nik;
      console.log('ID Satpam dari login:', this.idSatpam);
    } else {
      console.warn('User tidak ditemukan di Storage');
    }
  }

  async submitForm() {
  if (this.tamuForm.invalid) {
    alert('Lengkapi semua isian terlebih dahulu.');
    return;
  }

  const formData = this.tamuForm.value;

  if (!this.idSatpam) {
    alert('User belum login atau ID Satpam tidak ditemukan.');
    return;
  }

  // Validasi format jam checkin
  const jamRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!jamRegex.test(formData.checkin)) {
    alert('Format jam check-in harus HH:mm (contoh: 18:10)');
    return;
  }

  const payload = {
    ...formData,
    id_satpam: this.idSatpam,
    status: 'Masuk',
  };

  console.log('Payload dikirim ke API:', payload);

  try {
    const response = await this.api.createTamu(payload);
    console.log('Respon sukses dari API:', response);
    alert('Data tamu berhasil dikirim.');
    this.tamuForm.reset();
  } catch (err: any) {
    console.error('Gagal kirim tamu. Error detail:', err);
    if (err?.error) console.error('Detail error dari server:', err.error);
    alert('Gagal mengirim data tamu.');
  }
}

}
