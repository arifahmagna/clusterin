import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-layanan',
  templateUrl: './layanan.page.html',
  styleUrls: ['./layanan.page.scss'],
})
export class LayananPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goToPermohonan() {
    this.router.navigate(['/permohonan']);
  }

  goToPengaduan() {
    this.router.navigate(['/pengaduan']);
  }

}
