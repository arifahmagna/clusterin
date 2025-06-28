import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  standalone: false,
  selector: 'app-info-keluarga',
  templateUrl: './info-keluarga.page.html',
  styleUrls: ['./info-keluarga.page.scss'],
})
export class InfoKeluargaPage implements OnInit {
  editMode = false;
  showSuccessModal = false;
  userId: number = 0;

  data = {
    kepalaKeluarga: '',
    alamat: '',
    jumlahAnggota: 0,
    anggotaKeluarga: [] as any[]
  };

  constructor(
    private router: Router,
    private api: ApiService,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();
    const user = await this.api.getProfile();
    this.userId = user.id;

    const anggota = (await this.api.getAnggota(user.address)).map((a: any) => ({
      ...a,
      fromUserTable: false
    }));

    const users = (await this.api.getUsers(user.address)).map((u: any) => ({
      ...u,
      fromUserTable: true
    }));

    this.data.anggotaKeluarga = anggota.concat(users);
    this.data.kepalaKeluarga = user.nik_kk;
    this.data.alamat = user.address;
    this.data.jumlahAnggota = this.data.anggotaKeluarga.length;

   
    if (this.data.anggotaKeluarga.length === 0) {
      this.data.anggotaKeluarga.push({
        fullname: '',
        address: this.data.alamat,
        user_id: this.userId,
        fromUserTable: false
      });
    }
  }

  async toggleEdit() {
    if (this.editMode) {
      try {
        const user = await this.api.getProfile();

        for (const anggota of this.data.anggotaKeluarga) {
          
          if (anggota.fromUserTable) {
            console.log('⏭ Lewati user:', anggota.fullname);
            continue;
          }

          const payload = {
            fullname: anggota.fullname,
            address: anggota.address || user.address,
            user_id: user.id
          };

          if (anggota.id) {
            console.log('🔁 Update anggota:', payload);
            await this.api.updateAnggota(anggota.id, payload);
          } else {
            console.log('➕ Tambah anggota:', payload);
            await this.api.createAnggota(payload);
          }
        }

      
        const anggotaBaru = await this.api.getAnggota(user.address);
        this.data.anggotaKeluarga = anggotaBaru.concat(
          (await this.api.getUsers(user.address)).map((u: any) => ({
            ...u,
            fromUserTable: true
          }))
        );
        this.data.jumlahAnggota = this.data.anggotaKeluarga.length;

        this.showSuccessModal = true;
      } catch (err) {
        console.error('❌ Gagal kirim anggota:', err);
      }
    }

    this.editMode = !this.editMode;
  }

  tambahAnggota() {
    this.data.anggotaKeluarga.push({
      fullname: '',
      address: this.data.alamat,
      user_id: this.userId,
      fromUserTable: false
    });
  }

  async hapusAnggota(index: number) {
    const anggota = this.data.anggotaKeluarga[index];
    if (anggota.id && !anggota.fromUserTable) {
      await this.api.deleteAnggota(anggota.id);
    }
    this.data.anggotaKeluarga.splice(index, 1);
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
}
