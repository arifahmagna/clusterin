import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayananPage } from './layanan.page';

const routes: Routes = [
  {
    path: '',
    component: LayananPage
  },
  {
    path: 'permohonan',
    loadChildren: () => import('../permohonan/permohonan.module').then(m => m.PermohonanPageModule)
  },
  {
    path: 'pengaduan',
    loadChildren: () => import('../pengaduan/pengaduan.module').then(m => m.PengaduanPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayananPageRoutingModule {}
