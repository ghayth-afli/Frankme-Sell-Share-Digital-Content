import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LinkSummaryService } from '../services/link-summary';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  summary$: Observable<any>;
  constructor(private linkSummaryService: LinkSummaryService) {}
  ngOnInit() {
    this.summary$ = this.linkSummaryService.getLinkSummary();
  }
}
