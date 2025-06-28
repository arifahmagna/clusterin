import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  standalone: false,
  selector: 'app-pengaduan',
  templateUrl: './pengaduan.page.html',
  styleUrls: ['./pengaduan.page.scss'],
})
export class PengaduanPage implements OnInit {
  selectedStatus: string = 'Semua';

  pengaduanList:  any[] = [];
  isLoading = false;

   
  filteredPengaduan() {
    if (this.selectedStatus === 'Semua') {
      return this.pengaduanList;
    }
    return this.pengaduanList.filter(p => p.status === this.selectedStatus);
  }

  getBorderColor(status: string): string {
    switch (status) {
      case 'Disetujui':
        return '#16a34a';
      case 'Menunggu':
        return '#f59e0b';
      case 'Ditolak':
        return '#dc2626';
      case 'Dilihat':
        return '#3B82F6';
      default:
        return '#6b7280';
    }
  }

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadPengaduan();
  }

  async loadPengaduan() {
  this.isLoading = true;
  try {
    const currentUser = await this.apiService.getCurrentUser(); 
    const userId = currentUser?.id;

    this.apiService.getPengajuan().subscribe({
      next: (response) => {
        this.pengaduanList = response.filter((pengajuan: any) =>
          pengajuan.kategori === 'Pengaduan' && pengajuan.user?.id === userId
        );
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Gagal ambil pengaduan: ', err);
        this.isLoading = false;
      }
    });
  } catch (error) {
    console.error('Gagal ambil user dari storage:', error);
    this.isLoading = false;
  }
}


}
