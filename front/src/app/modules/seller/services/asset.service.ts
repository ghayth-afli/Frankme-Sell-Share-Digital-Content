import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../../config/config';

@Injectable()
export class AssetService {
  constructor(private http: HttpClient) {}

  uploadFiles(files: FormData) {
    return this.http.post<File>(API_BASE_URL + '/upload', files);
  }
}
