import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../../config/config';
import { Link } from '../../../shared/models/link';

@Injectable()
export class AssetService {
  constructor(private http: HttpClient) {}

  uploadFiles(files: FormData) {
    return this.http.post<{ fileName: string }>(
      API_BASE_URL + '/upload',
      files
    );
  }

  postAsset(assetInfo: Link) {
    return this.http.post<{
      linkUniqueId: string;
    }>(API_BASE_URL + '/links', assetInfo);
  }
}
