
import { Component, OnInit } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-laporan',
  templateUrl: './laporan.page.html',
  styleUrls: ['./laporan.page.scss'],
})
export class LaporanPage implements OnInit {
  searchTerm: string = "";
  selectedFilter: string = "all";
  selectedDate: string = "";
  semuaDitampilkan: boolean = false;
  selectedTab: 'kunjungan' | 'shift' = 'kunjungan';

  constructor() { }

  ngOnInit() {
    console.log('Data dari LaporanPage:', this.searchTerm, this.selectedFilter, this.selectedDate, this.semuaDitampilkan);
    console.log('selectedTab:', this.selectedTab);
  }

  tampilkanSemua() {
    this.semuaDitampilkan = true;
  }

  sembunyikanSebagian() {
    this.semuaDitampilkan = false;
  }

  switchTab(tab: 'kunjungan' | 'shift') {
    console.log('Switching to tab:', tab);
    this.selectedTab = tab;
  }
}

