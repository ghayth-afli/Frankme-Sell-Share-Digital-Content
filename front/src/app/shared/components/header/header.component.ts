import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  status: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}
  drop() {
    this.status = !this.status;
  }

  logout() {
    console.log('sqdqsldjqlksj');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
