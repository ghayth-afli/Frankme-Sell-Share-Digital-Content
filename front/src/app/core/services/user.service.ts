import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../../config/config';
import { User } from '../../shared/models/user';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  //Load User Data
  loadCurrentUser() {
    return this.http.get<User>(API_BASE_URL + '/users/me');
  }
}
