import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  currentUser: any = null;
  tamuHariIni: number = 0;
  aktivitas: any[] = [];
  shiftInfo: any = null;

  constructor(
    private navController: NavController,
    private api: ApiService
  ) {}

  async ngOnInit() {
    this.currentUser = await this.api.getCurrentUser();
    await this.loadShiftInfo();
    this.loadTamuHariIni();
  }

  async loadShiftInfo() {
    try {
      const allShift = await this.api.getShift();
      const activeShift = allShift.find((s: any) =>
        s.id_satpam === this.currentUser.nik &&
        s.status?.toLowerCase() === 'on'
      );

      if (activeShift) {
        this.shiftInfo = {
          shift: activeShift.shift,
          waktu: activeShift.shift === '1' ? '06:00 - 18:00' : '18:00 - 06:00',
          mulai: new Date(activeShift.mulai)
        };
      } else {
        this.shiftInfo = null;
      }
    } catch (err) {
      console.error('Gagal mengambil shift:', err);
    }
  }

  loadTamuHariIni() {
    this.api.getGuest().subscribe((guests: any[]) => {
      const today = new Date().toISOString().slice(0, 10); // contoh: 2025-06-26

      this.tamuHariIni = guests.filter((g: any) => {
        if (!g.created_at) return false;
        const createdDate = new Date(g.created_at).toISOString().slice(0, 10);
        return createdDate === today;
      }).length;

      const sorted = guests
        .filter((g: any) => g.created_at)
        .sort((a: any, b: any) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

      this.aktivitas = sorted.slice(0, 5).map((g: any) => ({
        nama: g.fullname,
        status: g.status?.toLowerCase() === 'masuk' ? 'check-in' : 'check-out',
        statusColor: g.status?.toLowerCase() === 'masuk' ? 'success' : 'failed',
        tanggal: new Date(g.created_at).toLocaleDateString(),
        alamat: g.address,
        tujuan: g.reason,
        alamatTujuan: g.destination,
        estimasi: g.estimation,
        waktuMasuk: g.checkin,
        waktuKeluar: g.checkout,
        keterangan: g.reason,
        isOpen: false
      }));
    });
  }

  lihatSemuaAktivitas() {
    this.navController.navigateForward('/status');
  }

  goToLaporan() {
    this.navController.navigateForward('/laporan');
  }
}
