import { AuthService } from './../services/auth/auth.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

export const userLoggedGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const authResponse = authService.authenticateUser();
  if (!authResponse) return router.createUrlTree(['/myaccount']);
  try {
    const user = await firstValueFrom(authResponse);
    return user.role === 'USER' || user.role === 'ADMIN'
      ? true
      : router.createUrlTree(['/myaccount']);
  } catch (error) {
    router.createUrlTree(['/myaccount']);
    return false;
  }
};
