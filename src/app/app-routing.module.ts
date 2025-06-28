import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authguardGuard } from './authguard/authguard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // SATPAM
  {
    path: 'tabs',
    loadChildren: () => import('./satpam/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [authguardGuard],
    data: { roles: ['satpam'] }
  },
  {
    path: 'status',
    loadChildren: () => import('./satpam/status/status.module').then(m => m.StatusPageModule),
    canActivate: [authguardGuard],
    data: { roles: ['satpam'] }
  },
  {
    path: 'shift',
    loadChildren: () => import('./satpam/shift/shift.module').then(m => m.ShiftPageModule),
    canActivate: [authguardGuard],
    data: { roles: ['satpam'] }
  },
  {
    path: 'profile',
    loadChildren: () => import('./satpam/profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [authguardGuard],
    data: { roles: ['satpam'] }
  },
  {
    path: 'laporan',
    loadChildren: () => import('./satpam/laporan/laporan.module').then(m => m.LaporanPageModule),
    canActivate: [authguardGuard],
    data: { roles: ['satpam'] }
  },

  // WARGA
  {
    path: 'warga/tabs',
    loadChildren: () => import('./warga/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [authguardGuard],
    data: { roles: ['warga'] }
  },
  {
    path: 'home',
    loadChildren: () => import('./warga/home/home.module').then(m => m.HomePageModule),
    canActivate: [authguardGuard],
    data: { roles: ['warga'] }
  },
  {
    path: 'notifikasi',
    loadChildren: () => import('./warga/notifikasi/notifikasi.module').then(m => m.NotifikasiPageModule),
    canActivate: [authguardGuard],
    data: { roles: ['warga'] }
  },
  {
    path: 'layanan',
    loadChildren: () => import('./warga/layanan/layanan.module').then(m => m.LayananPageModule),
    canActivate: [authguardGuard],
    data: { roles: ['warga'] }
  },
  {
    path: 'permohonan',
    loadChildren: () => import('./warga/permohonan/permohonan.module').then(m => m.PermohonanPageModule),
    canActivate: [authguardGuard],
    data: { roles: ['warga'] }
  },
  {
    path: 'pengaduan',
    loadChildren: () => import('./warga/pengaduan/pengaduan.module').then(m => m.PengaduanPageModule),
    canActivate: [authguardGuard],
    data: { roles: ['warga'] }
  },
  {
    path: 'form-permohonan',
    loadChildren: () => import('./warga/form-permohonan/form-permohonan.module').then(m => m.FormPermohonanPageModule),
    canActivate: [authguardGuard],
    data: { roles: ['warga'] }
  },
  {
    path: 'form-pengaduan',
    loadChildren: () => import('./warga/form-pengaduan/form-pengaduan.module').then(m => m.FormPengaduanPageModule),
    canActivate: [authguardGuard],
    data: { roles: ['warga'] }
  },
  {
    path: 'kunjungan',
    loadChildren: () => import('./warga/kunjungan/kunjungan.module').then(m => m.KunjunganPageModule),
    canActivate: [authguardGuard],
    data: { roles: ['warga'] }
  },
  {
    path: 'profile',
    loadChildren: () => import('./warga/profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [authguardGuard],
    data: { roles: ['warga'] }
  },
  {
    path: 'info-pribadi',
    loadChildren: () => import('./warga/info-pribadi/info-pribadi.module').then(m => m.InfoPribadiPageModule),
    canActivate: [authguardGuard],
    data: { roles: ['warga'] }
  },
  {
    path: 'info-keluarga',
    loadChildren: () => import('./warga/info-keluarga/info-keluarga.module').then(m => m.InfoKeluargaPageModule),
    canActivate: [authguardGuard],
    data: { roles: ['warga'] }
  },
  {
    path: 'profile-rumah',
    loadChildren: () => import('./warga/profile-rumah/profile-rumah.module').then(m => m.ProfileRumahPageModule),
    canActivate: [authguardGuard],
    data: { roles: ['warga'] }
  },

  // Public (tidak perlu role)
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
