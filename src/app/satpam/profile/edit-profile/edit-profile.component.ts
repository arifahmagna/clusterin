import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  standalone: false,
})
export class EditProfileComponent implements OnInit {

  constructor(private modalCtrl: ModalController, private router: Router) {}

  async dismissModal() {
    await this.modalCtrl.dismiss();
  }

  async dismissAndGoToProfile() {
  await this.modalCtrl.dismiss(); // tutup modal dulu
  this.router.navigate([' ']); // navigasi ke halaman Profile
}

  onSubmit() {
    // aksi submit nanti di sini
  }

  ngOnInit() {}
}
