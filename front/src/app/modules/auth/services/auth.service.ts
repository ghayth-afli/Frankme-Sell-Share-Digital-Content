import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtToken } from '../../../shared/models/jwtToken';
import { shareReplay } from 'rxjs/operators';
import { API_BASE_URL } from '../../../config/config';
import { TokenStorageService } from '../../../core/services/TokenStorage.service';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class AuthService {
  constructor(
    private tokenStorageService: TokenStorageService,
    private http: HttpClient,
    private router: Router
  ) {}

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: number
  ) {
    return this.http.post(API_BASE_URL + '/authentication/sign-up', {
      email,
      password,
      firstName,
      lastName,
      phone,
    });
  }

  login(email: string, password: string) {
    return this.http
      .post<jwtToken>(API_BASE_URL + '/authentication/sign-in', {
        email,
        password,
      })
      .pipe(shareReplay());
  }

  refreshToken(token: string) {
    return this.http.post(
      API_BASE_URL + '/authentication/refresh-tokens',
      {
        refreshToken: token,
      },
      httpOptions
    );
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigateByUrl('/login');
  }
}
