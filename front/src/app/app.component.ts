import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './modules/seller/services/user.service';
import { AuthenticatedUserService } from './core/services/authenticatedUser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'client';
  constructor(
    private userService: UserService,
    private authenticatedUser: AuthenticatedUserService
  ) {}
}
