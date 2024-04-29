import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user';
import { Router } from '@angular/router';
import { UserService } from '../../modules/seller/services/user.service';

@Injectable()
export class AuthenticatedUserService {
  private user: User;
  private isAuthenticated = false;

  constructor(private router: Router, private userService: UserService) {}

  setUser(user: User, isAuthenticated: boolean) {
    this.user = user;
    this.isAuthenticated = isAuthenticated;
  }

  isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
