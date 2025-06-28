import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  standalone: false,
  selector: 'app-permohonan',
  templateUrl: './permohonan.page.html',
  styleUrls: ['./permohonan.page.scss'],
})
export class PermohonanPage implements OnInit {
  selectedStatus: string = 'Semua';
  permohonanList: any[] = [];
  isLoading = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadPermohonan();
  }

  async loadPermohonan() {
    this.isLoading = true;

    try {
      const currentUser = await this.apiService.getCurrentUser(); // ambil user login
      const userId = currentUser?.id;

      this.apiService.getPengajuan().subscribe({
        next: (response) => {
          this.permohonanList = response.filter((pengajuan: any) =>
            pengajuan.kategori === 'Permohonan' && pengajuan.user?.id === userId
          );
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Gagal ambil permohonan', err);
          this.isLoading = false;
        }
      });
    } catch (error) {
      console.error('Gagal ambil user dari storage', error);
      this.isLoading = false;
    }
  }

  filteredPermohonan() {
    if (this.selectedStatus === 'Semua') {
      return this.permohonanList;
    }
    return this.permohonanList.filter(p => p.status === this.selectedStatus);
  }

  getBorderColor(status: string): string {
    switch (status) {
      case 'Disetujui': return '#16a34a';
      case 'Menunggu': return '#f59e0b';
      case 'Ditolak': return '#dc2626';
      case 'Dilihat': return '#3B82F6';
      default: return '#6b7280';
    }
  }
}
