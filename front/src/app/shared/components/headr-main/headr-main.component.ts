import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-headr-main',
  templateUrl: './headr-main.component.html',
  styleUrl: './headr-main.component.css',
})
export class HeadrMainComponent {
  @ViewChild('navbar') navbar: ElementRef;

  lastScrollPosition: number;

  constructor() {}

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
}
