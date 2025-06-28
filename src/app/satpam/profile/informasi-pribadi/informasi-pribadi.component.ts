import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-informasi-pribadi',
  templateUrl: './informasi-pribadi.component.html',
  styleUrls: ['./informasi-pribadi.component.scss'],
  standalone: false,
})
export class InformasiPribadiComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  async openEditProfileModal() {
    const modal = await this.modalCtrl.create({
      component: EditProfileComponent,
      cssClass: 'edit-profile-modal', // pastikan class-nya benar
    });
    return await modal.present();
  }

  async dismissModal() {
    await this.modalCtrl.dismiss(); // perbaikan pemanggilan service
  }

  ngOnInit() {}
}
