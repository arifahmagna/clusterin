import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-kunjungan',
  templateUrl: './kunjungan.component.html',
  styleUrls: ['./kunjungan.component.scss'],
  standalone: false
})
export class KunjunganComponent implements OnInit {
  tamuList: any[] = [];
  searchTerm: string = "";
  selectedDate: string = "";
  semuaDitampilkan: boolean = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getGuest().subscribe((data: any[]) => {
  this.tamuList = data || [];
  console.log('Tamu yang diambil:', this.tamuList);
});

  }

  tampilkanSemua() {
    this.semuaDitampilkan = true;
  }

  sembunyikanSebagian() {
    this.semuaDitampilkan = false;
  }

 get filteredTamu() {
  return this.tamuList.filter(tamu => {
    const namaCocok = !this.searchTerm || tamu.fullname?.toLowerCase().includes(this.searchTerm.toLowerCase());
    
    const tanggalCocok = !this.selectedDate || 
      tamu.created_at?.slice(0, 10) === this.selectedDate;

    return namaCocok && tanggalCocok;
  });
}


}
