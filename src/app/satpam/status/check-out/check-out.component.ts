import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-keluar',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
  standalone: false
})
export class CheckOutComponent {
  @Input() tamuKeluar: any[] = [];
}
