import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../modules/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @ViewChild('navbar') navbar: ElementRef;

  lastScrollPosition: number;

  constructor(private authService: AuthService) {}


  ngAfterViewInit() {
    window.addEventListener('scroll', () => {
      const currentScrollPosition = window.pageYOffset;

      if (
        currentScrollPosition > this.lastScrollPosition &&
        currentScrollPosition > 50
      ) {
        // hide the navbar
        this.navbar.nativeElement.classList.add('navbar-hide');
      } else {
        // show the navbar
        this.navbar.nativeElement.classList.remove('navbar-hide');
      }

      this.lastScrollPosition = currentScrollPosition;
    });
  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}