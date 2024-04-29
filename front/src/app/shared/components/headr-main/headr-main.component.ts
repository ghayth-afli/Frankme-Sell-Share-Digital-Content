import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
} from 'rxjs';

@Component({
  selector: 'app-headr-main',
  templateUrl: './headr-main.component.html',
  styleUrl: './headr-main.component.css',
})
export class HeadrMainComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.scrollSubscription = fromEvent(window, 'scroll')
      .pipe(
        filter(() => window.scrollY > 0),
        map(() => window.scrollY),
        debounceTime(100),
        distinctUntilChanged()
      )
      .subscribe((scrollPosition: number) => {
        this.isNavbarFixed = true;
        if (scrollPosition > 100) {
          this.isNavbarHidden = true;
        } else {
          this.isNavbarHidden = false;
        }
      });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  isNavbarFixed = false;
  isNavbarHidden = false;
  private scrollSubscription: Subscription;
}
