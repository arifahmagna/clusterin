import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  standalone: false,
  selector: 'app-profile-rumah',
  templateUrl: './profile-rumah.page.html',
  styleUrls: ['./profile-rumah.page.scss'],
})


export class ProfileRumahPage implements OnInit {
  editMode = false;
  showSuccessModal = false;
  profile: any = {};

   rumah: any = {
    id: null,
    nomor: '',
    status: ''
  };

  constructor(
  private api: ApiService,
  private storage: Storage,
  private router: Router
) {}


  async ngOnInit() {
    await this.storage.create();
    this.profile = await this.api.getProfile();
    const rumahData = await this.api.getRumah();
    if (rumahData.length > 0) {
      this.rumah = rumahData[0];
    }
  }

async toggleEdit() {
  this.editMode = !this.editMode;

  if (!this.editMode) {
    try {
      const payload = {
        nomor: this.rumah.nomor,
        status: this.rumah.status
      };

      console.log('Payload final:', payload);

      if (this.rumah.id) {
        const res = await this.api.updateRumah(this.rumah.id, payload);
        console.log('Respon updateRumah:', res);
      } else {
        const res = await this.api.createRumah(payload);
        console.log('Respon createRumah:', res);
      }
      this.profile.address = this.rumah.nomor
      await this.api.updateProfile(this.profile);
      await this.api.setCurrentUser(this.profile);
      this.showSuccessModal = true;
    } catch (err) {
      console.error('Gagal simpan rumah:', err);
    }
  }
}



  async hapusRumah() {
    if (this.rumah.id) {
      await this.api.deleteRumah(this.rumah.id);
      this.rumah = { id: null, nomor: '', status: '' };
    }
  }

  kembali() {
    this.router.navigate(['/warga/tabs/profile']);
  }

  kembaliKeProfil() {
    this.showSuccessModal = false;
    this.router.navigate(['/warga/tabs/profile']);
  }

  kembaliKeBeranda() {
    this.showSuccessModal = false;
    this.router.navigate(['/warga/tabs/home']);
  }

  gantiFoto() {
    console.log('Trigger ganti foto');
    
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.rumah.foto = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  
}
