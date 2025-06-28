import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: false,
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  editMode = false;
  profile: any = {};
  alamatAwal: string = ''; 

  informasiLain = [
    {
      title: 'Informasi Keluarga',
      route: '/info-keluarga',
      icon: 'people-outline'
    },
    {
      title: 'Profil Rumah',
      route: '/profile-rumah',
      icon: 'home-outline'
    }
  ];

  constructor(
    private router: Router,
    private storage: Storage,
    private api: ApiService,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    try {
      this.profile = await this.api.getProfile();
      this.alamatAwal = this.profile.address; 

      this.http.get(`https://clusterin.site/api/user/getphoto/${this.profile.nik}`).subscribe((res: any) => {
        this.profile.foto = res.foto_url;
        console.log('Url: ', this.profile.foto);
      });
    } catch (err) {
      console.error('Gagal ambil profil:', err);
    }
  }

  async toggleEdit() {
    if (this.editMode) {
      try {
        const updated = await this.api.updateProfile(this.profile);
        await this.api.setCurrentUser(updated.data);

        
        const rumahData = await this.api.getRumah();
        if (rumahData.length > 0) {
          const rumah = rumahData[0];
          const payload = {
            nomor: this.profile.address,
            status: rumah.status
          };
          await this.api.updateRumah(rumah.id, payload);
        }

       
        const anggotaLama = await this.api.getAnggota(this.alamatAwal);
        for (const anggota of anggotaLama) {
          const newPayload = {
            fullname: anggota.fullname,
            address: this.profile.address,
            user_id: anggota.user_id
          };
          await this.api.updateAnggota(anggota.id, newPayload);
        }

        alert('Profil berhasil diperbarui');
      } catch (error) {
        alert('Gagal memperbarui profil');
        console.error(error);
      }
    }

    this.editMode = !this.editMode;
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

      const renamedFile = new File([blob], `${this.profile.nik}.jpg`, { type: file.type });

      const formData = new FormData();
      formData.append('foto', renamedFile);
      formData.append('nik', this.profile.nik);

      this.http.post('https://clusterin.site/api/user/uploadPhoto', formData).subscribe(
        (res: any) => {
          console.log('Upload berhasil:', res);
          this.profile.foto = res.foto_url;
        },
        (err) => {
          console.error('Upload gagal:', err);
          alert('Upload gagal, coba lagi');
        }
      );
    };

    reader.readAsArrayBuffer(file);
  }

  bukaHalaman(route: string) {
    this.router.navigate([route]);
    console.log('Navigasi ke:', route);
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

