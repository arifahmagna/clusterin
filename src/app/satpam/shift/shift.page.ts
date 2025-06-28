import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-shift',
  templateUrl: './shift.page.html',
  styleUrls: ['./shift.page.scss'],
  standalone: false
})
export class ShiftPage implements OnInit {
  selectedShift: string = '';
  shiftStarted: boolean = false;
  mulai: any = '';
  successMsg: string = '';
  errorMsg: string = '';

  currentUser: any;
  existingShift: any = null;

  constructor(private api: ApiService) {}
  formatDateOnly(date: Date): string {
  return date.toISOString().slice(0, 10);
}

formatDateTimeLocal(date: Date): string {

  const timezoneOffset = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() - timezoneOffset);
  return localDate.toISOString().slice(0, 19).replace('T', ' ');
}



  async ngOnInit() {
    await this.loadUserAndShift();
  }

  async loadUserAndShift() {
  try {
    this.currentUser = await this.api.getCurrentUser();
    const allShift = await this.api.getShift();

    
    const userShift = allShift.find((s: any) =>
      s.id_satpam === this.currentUser.nik && s.selesai === null
    );

    if (userShift) {
      this.existingShift = userShift;
      this.shiftStarted = true;
      this.selectedShift = userShift.shift;
      this.mulai = new Date(userShift.mulai); 
    } else {
      this.existingShift = null;
      this.shiftStarted = false;
      this.selectedShift = '';
      this.mulai = '';
    }

  } catch (err) {
    console.error('Gagal load shift:', err);
    this.errorMsg = 'Gagal mengambil data shift.';
  }
}


  async startShift() {
  if (!this.selectedShift) return;

  try {
    const now = new Date();
    const tanggalShift = new Date(now);
    tanggalShift.setHours(0, 0, 0, 0);

 const data = {
  id_satpam: this.currentUser.nik,
  shift: this.selectedShift,
  tanggal: this.formatDateTimeLocal(tanggalShift),
  mulai: this.formatDateTimeLocal(now),
  status: 'on'
};


    console.log('DATA YANG DIKIRIM:', data);
    await this.api.createShift(data);
    this.successMsg = 'Shift dimulai.';
    this.errorMsg = '';
    this.loadUserAndShift();

  } catch (err) {
    console.error('ERROR SHIFT:', (err as any).error?.message || err);
    this.errorMsg = 'Gagal memulai shift.';
    this.successMsg = '';
  }
}

async endShift() {
  if (!this.existingShift) return;

  try {
    const updateData = {
  selesai: this.formatDateTimeLocal(new Date()),
  status: 'off'
};


    await this.api.updateShift(this.existingShift.id, updateData);
    this.successMsg = 'Shift selesai.';
    this.errorMsg = '';
    this.loadUserAndShift();

  } catch (err) {
    console.error('ERROR SELESAI SHIFT:', (err as any).error?.message || err);
    this.errorMsg = 'Gagal menyelesaikan shift.';
    this.successMsg = '';
  }
}



}
