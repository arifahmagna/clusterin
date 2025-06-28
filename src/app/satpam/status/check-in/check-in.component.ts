import { Component, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-masuk',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss'],
  standalone: false
})
export class CheckInComponent {
  @Input() tamuMasuk: any[] = [];

  constructor(private api: ApiService) {}

  async checkout(guest: any) {
    try {
      const payload = {
        ...guest,
        status: 'Keluar',
        checkout: new Date().toLocaleTimeString(),
      };

      await this.api.updateTamu(guest.id, payload);
      alert('Status tamu berhasil diubah menjadi Keluar.');
    } catch (err) {
      console.error(err);
      alert('Gagal mengupdate status tamu.');
    }
  }
}
