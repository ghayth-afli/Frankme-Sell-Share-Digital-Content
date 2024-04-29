import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  constructor(private router: Router, private authService: AuthService) {
    if (this.authService.isLoggedIn()) {
      router.navigate(['/']);
    }
  }
}
