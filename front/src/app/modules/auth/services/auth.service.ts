import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtToken } from '../../../shared/models/jwtToken';
import { shareReplay } from 'rxjs/operators';
import { API_BASE_URL } from '../../../config/config';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

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
}
