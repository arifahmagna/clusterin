import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
  standalone: false
})
export class StatusPage implements OnInit {
  tab: string = 'masuk';
  searchTerm: string = '';
  guestList: any[] = [];

  filteredMasuk: any[] = [];
  filteredKeluar: any[] = [];

  totalMasuk: number = 0;
  totalKeluar: number = 0;
  latestUpdate: string = '-';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadData();
  }

  segmentChanged(event: any) {
    this.tab = event.detail.value;
  }

  loadData() {
    this.api.getGuest().subscribe(data => {
      this.guestList = data;

      const sorted = [...data].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      this.latestUpdate = sorted.length > 0 ? new Date(sorted[0].updated_at).toLocaleString() : '-';

      this.updateFilteredData();
    });
  }

  updateFilteredData() {
    const term = this.searchTerm.toLowerCase();

    this.filteredMasuk = this.guestList.filter(
      g => g.status === 'Masuk' && g.fullname.toLowerCase().includes(term)
    );
    this.filteredKeluar = this.guestList.filter(
      g => g.status === 'Keluar' && g.fullname.toLowerCase().includes(term)
    );

    this.totalMasuk = this.filteredMasuk.length;
    this.totalKeluar = this.filteredKeluar.length;
  }

  filterData() {
    this.updateFilteredData();
  }

  async handleCheckout(guest: any) {
    try {
      const payload = { ...guest, status: 'Keluar', checkout: new Date().toLocaleTimeString() };
      await this.api.updateTamu(guest.id, payload);
      this.loadData();
      alert('Status tamu berhasil diubah menjadi Keluar.');
    } catch (error) {
      console.error(error);
      alert('Gagal mengupdate status tamu.');
    }
  }
}
