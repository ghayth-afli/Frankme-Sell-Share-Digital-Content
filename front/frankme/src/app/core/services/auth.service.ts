import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable, inject } from '@angular/core';
import { privateDecrypt } from 'crypto';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser?: string;
  private isAuthentificatedSubject = new BehaviorSubject<boolean>(false);
  private http = inject(HttpClient);
  constructor() {}
  login(user: { email: string; password: string }): Observable<any> {
    return this.http
      .post('/api/login', user)
      .pipe(tap((tokens) => this.doLoginUser(user.email, tokens)));
  }
  private doLoginUser(email: string, tokens: any) {
    this.loggedUser = email;
  }
}
