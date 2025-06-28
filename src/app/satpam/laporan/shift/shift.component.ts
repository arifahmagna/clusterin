import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss'],
  standalone: false,
})
export class ShiftComponent implements OnInit {
  semuaShift: any[] = [];
  searchTerm: string = '';
  selectedDate: string = '';
  semuaDitampilkan: boolean = false;


  constructor(private api: ApiService) {}

  async ngOnInit() {
    await this.loadSemuaShift();
  }

  async loadSemuaShift() {
    try {
      const data = await this.api.getShift();
      this.semuaShift = data;
    } catch (err) {
      console.error('Gagal memuat shift:', err);
    }
  }

  get filteredShift() {
    return this.semuaShift
      .filter((shift) => {
        const cocokNama = this.searchTerm
          ? shift.user?.fullname.toLowerCase().includes(this.searchTerm.toLowerCase())
          : true;

        const cocokTanggal = this.selectedDate
          ? shift.mulai?.slice(0, 10) === this.selectedDate
          : true;

        return cocokNama && cocokTanggal;
      })
      .slice(0, this.semuaDitampilkan ? undefined : 5);
  }
}
