import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InformasiPribadiComponent } from './informasi-pribadi/informasi-pribadi.component';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage {
  userData: any = {};
  isEditMode = false;

  constructor(
    private modalCtrl: ModalController,
    private apiService: ApiService,
    private router: Router,
    private http: HttpClient,
    private storage: Storage
  ) { }

  

 async ngOnInit() {
    try {
      this.userData = await this.apiService.getProfile(); 
      this.http.get(`https://clusterin.site/api/user/getphoto/${this.userData.nik}`).subscribe((res: any) => {
        // Update data profil dengan data dari server
        this.userData.foto = res.foto_url;
        console.log('Url: ', this.userData.foto)
      });
    } catch (err) {
      console.error('Gagal ambil data profil:', err);
    }
  }

  onChangeFoto(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran gambar maksimal 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const blob = new Blob([arrayBuffer], { type: file.type });

      // Rename file to NIK.jpg
      const renamedFile = new File([blob], `${this.userData.nik}.jpg`, { type: file.type });

      const formData = new FormData();
      formData.append('foto', renamedFile);
      formData.append('nik', this.userData.nik); // agar bisa dipakai validasi di backend

      this.http.post('https://clusterin.site/api/user/uploadPhoto', formData).subscribe(
        (res: any) => {
          console.log('Upload berhasil:', res);
          this.userData.foto = res.foto_url;
        },
        (err) => {
          console.error('Upload gagal:', err);
          alert('Upload gagal, coba lagi');
        }
      );
    };

    reader.readAsArrayBuffer(file);
  }

  enableEdit() {
    this.isEditMode = true;
  }

 async saveChanges() {
  try {
    const updated = await this.apiService.updateProfile(this.userData);
    
    
    await this.apiService.setCurrentUser(updated.data);

    this.isEditMode = false;
    alert('Profil berhasil diperbarui');
  } catch (error) {
    console.error('Gagal update:', error);
    alert('Terjadi kesalahan saat menyimpan data');
  }
}


  cancelEdit() {
    this.isEditMode = false;
    this.ngOnInit(); 
  }

    async logout() {
  const confirm = window.confirm('Yakin ingin logout?');
  if (confirm) {
    await this.storage.create();
    await this.storage.clear();
    this.router.navigate(['/login']);
  }
}
}

  

 