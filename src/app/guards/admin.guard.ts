import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { firstValueFrom } from 'rxjs';

export const AdminGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const authResponse = authService.authenticateUser();
  if (!authResponse) return router.createUrlTree(['/myaccount']);
  try {
    const user = await firstValueFrom(authResponse);
    return user.role === 'ADMIN' ? true : router.createUrlTree(['/myaccount']);
  } catch (error) {
    router.createUrlTree(['/myaccount']);
    return false;
  }
};
