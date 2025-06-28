import { Component, OnInit } from '@angular/core';
import { NotifikasiService } from '../../services/notifikasi.service';
import { Router } from '@angular/router';

interface Notifikasi {
  id: number;
  kategori: string;
  title: string;
  desc: string;
  status: string;
  waktu: string;
}

@Component({
  standalone: false,
  selector: 'app-notifikasi',
  templateUrl: './notifikasi.page.html',
  styleUrls: ['./notifikasi.page.scss'],
})
export class NotifikasiPage implements OnInit {

  notifikasiTerfilter: { [key: string]: Notifikasi[] } = {};

  constructor(
    private notifikasiService: NotifikasiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.notifikasiService.getSemuaNotifikasi().subscribe({
      next: (data) => {
        const grouped: { [key: string]: Notifikasi[] } = {};
        const now = new Date();

        data.forEach((item: Notifikasi) => {
          const notifDate = new Date(item.waktu);
          const diffInDays = Math.floor(
            (now.getTime() - notifDate.getTime()) / (1000 * 60 * 60 * 24)
          );

          if (diffInDays <= 3) {
            const key = this.formatKeyDate(item.waktu);
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(item);
          }
        });

        this.notifikasiTerfilter = grouped;
      },
      error: (err) => {
        console.error('Gagal ambil notifikasi:', err);
      }
    });
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  formatKeyDate(waktu: string): string {
    const now = new Date();
    const notifDate = new Date(waktu);
    const diffInTime = now.getTime() - notifDate.getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

    if (this.isSameDay(notifDate, now)) {
      return 'Hari Ini';
    } else if (diffInDays === 1) {
      return 'Kemarin';
    } else if (diffInDays === 2) {
      return '2 Hari Lalu';
    } else {
      return notifDate.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    }
  }

  getIconByJenis(kategori: string): string {
    const map: Record<string, string> = {
      Permohonan: 'document-text-outline',
      Tamu: 'person-outline',
      Pengaduan: 'alert-circle-outline'
    };
    return map[kategori] || 'notifications-outline';
  }

  getBadgeClass(status: string): string {
    const map: Record<string, string> = {
      Menunggu: 'badge-waiting',
      Ditolak: 'badge-denied',
      Disetujui: 'badge-done',
      Keluar: 'badge-denied',
      Masuk: 'badge-done',
    };
    return map[status] || '';
  }

  goToDetail(item: Notifikasi) {
    if (item.kategori === 'Pengaduan') {
      this.router.navigate(['/pengaduan']);
    } else if (item.kategori === 'Permohonan') {
      this.router.navigate(['/permohonan']);
    } else if (item.kategori === 'Tamu') {
      this.router.navigate(['warga/tabs/kunjungan']);
    }
  }


  getSortedKeys(): string[] {
  const order = ['Hari Ini', 'Kemarin', '2 Hari Lalu'];
  const keys = Object.keys(this.notifikasiTerfilter);

 
  return keys.sort((a, b) => {
    const idxA = order.indexOf(a);
    const idxB = order.indexOf(b);

    if (idxA !== -1 && idxB !== -1) {
      return idxA - idxB;
    } else if (idxA !== -1) {
      return -1;
    } else if (idxB !== -1) {
      return 1;
    } else {
      
      return new Date(b).getTime() - new Date(a).getTime();
    }
  });
}


}
