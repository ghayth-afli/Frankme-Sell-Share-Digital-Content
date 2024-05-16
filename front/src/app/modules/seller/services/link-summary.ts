import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../../config/config';
import { Link } from '../../../shared/models/link';

@Injectable()
export class LinkSummaryService {
  constructor(private http: HttpClient) {}

  getLinkSummary() {
    return this.http.get(API_BASE_URL + '/links/summary');
  }
}
