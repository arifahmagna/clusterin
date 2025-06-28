import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  nik: string = '';
  password: string = '';
  apiUrl: string = 'https://clusterin.site/api';

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private storage: Storage
  ) { }

  async ngOnInit() {
    await this.storage.create();
    const token = await this.storage.get('token');
    const user = await this.storage.get('user');

    if (token && user) {
      const role = user.role?.toLowerCase();

      if (role === 'satpam') {
        this.navCtrl.navigateRoot('/tabs/home');
      } else if (role === 'warga') {
        this.navCtrl.navigateRoot('/warga/tabs/home');
      } else {
        alert('Akun Anda tidak memiliki akses ke aplikasi.');
      }
    }
  }

  openForgotPassword() {
    window.open('https://clusterin.site/verify/whatsapp', '_system');
  }

  login() {
    if (!this.nik.trim() || !this.password.trim()) {
      alert('NIK dan Password wajib diisi!');
      return;
    }
    const body = {
      nik: this.nik,
      password: this.password
    };

    this.http.post<any>(`${this.apiUrl}/signin`, body).subscribe(
      async res => {
        if (res.data.status === 'Tidak Aktif') {
          alert('Akun ini belum diverifikasi.');
          return;
        }
        if (res.success && res.token && res.data) {
          await this.storage.create();
          await this.storage.clear();
          await this.storage.set('token', res.token);
          await this.storage.set('user', res.data);

          const role = res.data.role?.toLowerCase();

          if (role === 'satpam') {
            this.navCtrl.navigateRoot('/tabs/home');
          } else if (role === 'warga') {
            this.navCtrl.navigateRoot('/warga/tabs/home');
          } else {
            alert('Akun Anda tidak memiliki akses ke aplikasi.');
            return;
          }
        }
      },
      err => {
        console.error('Login gagal:', err);
        alert('Login gagal. Pastikan NIK dan Password benar.');
      }
    );
  }

}
