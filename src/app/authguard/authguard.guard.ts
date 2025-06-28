import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export const authguardGuard: CanActivateFn = async (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const storage = inject(Storage);

  try {
    await storage.create();
    const token = await storage.get('token');
    const user = await storage.get('user');

    if (!token || !user) {
      router.navigate(['/login']);
      return false;
    }

    const allowedRoles = route.data['roles'] as string[] | undefined;
    const userRole = user.role?.toLowerCase();

    if (allowedRoles && !allowedRoles.includes(userRole)) {
      alert('Akses ditolak: role tidak diizinkan');
      router.navigate(['/login']);
      return false;
    }

    return true;
  } catch (error) {
    console.error('AuthGuard error:', error);
    router.navigate(['/login']);
    return false;
  }
};
