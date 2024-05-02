import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../modules/auth/services/auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }
  //Check id user isLogedIn and Is Authorized
  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.authService.isLoggedIn()) {
      let role: string = '';
      this.userService.loadCurrentUser().subscribe({
        next: (response) => {
          role = response.role;
        },
      });
      if (route.data['role'] && route.data['role'].indexOf(role) === -1) {
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
