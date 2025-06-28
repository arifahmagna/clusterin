import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  form = {
    fullname: '',
    nik: '',
    nik_kk: '',
    address: '',
    whatsapp: '',
    gender: '',
    password: '',
    role: 'Warga',
    status: 'Tidak Aktif'
  };

  normalizeWhatsapp(nomor: string): string {
  nomor = nomor.trim(); // hapus spasi

  if (nomor.startsWith('+62')) {
    return '62' + nomor.slice(3);
  }

  if (nomor.startsWith('08')) {
    return '62' + nomor.slice(1);
  }

  if (nomor.startsWith('62')) {
    return nomor; // sudah benar
  }

  return nomor; // fallback
}


  kirimWhatsapp(id: string, nomor: string) {
    const token = '89rzXjZXuPxXzNufSj5c'; // Ganti dengan token asli Fonnte kamu
    const url = 'https://api.fonnte.com/send';
    const urls = `https://clusterin.site/verify/status/${id}`;
    const body = {
      target: nomor,
      message: `Verifikasi Akun | CLUSTERIN

Verifikasi Akun Disini:
${urls}

JANGAN BAGIKAN LINK INI KEPADA SIAPAPUN.` // awalan untuk Indonesia
    };

    const headers = new HttpHeaders({
      'Authorization': token
    });

    this.http.post(url, body, { headers }).subscribe(
      res => console.log('WhatsApp terkirim:', res),
      err => console.error('Gagal kirim WhatsApp:', err)
    );
  }

  register() {
    this.form.whatsapp = this.normalizeWhatsapp(this.form.whatsapp);
    this.http.post('https://clusterin.site/api/user/create', this.form)
      .subscribe(
        async (res: any) => {
          this.kirimWhatsapp(res.data.id, res.data.whatsapp);
          const alert = await this.alertController.create({
            header: 'Berhasil',
            message: 'Silahkan konfirmasi akun terlebih dahulu. Dipesan whatsapp yang kami kirim',
            buttons: ['OK']
          });

          await alert.present();

          // Tunggu hingga alert ditutup, lalu redirect ke login
          await alert.onDidDismiss();
          this.router.navigate(['/login']);
        },
        async err => {
          const alert = await this.alertController.create({
            header: 'Gagal',
            message: 'Registrasi gagal. Silakan periksa kembali data Anda.',
            buttons: ['OK']
          });

          await alert.present();
        }
      );
  }

}
