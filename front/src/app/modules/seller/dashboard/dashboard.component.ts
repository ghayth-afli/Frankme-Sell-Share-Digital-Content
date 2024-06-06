import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LinkSummaryService } from '../services/link-summary';
import { AssetService } from '../services/asset.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  summary$: Observable<any>;
  links$: Observable<any>;
  constructor(
    private linkSummaryService: LinkSummaryService,
    private assetService: AssetService
  ) {}
  ngOnInit() {
    this.summary$ = this.linkSummaryService.getLinkSummary();
    this.links$ = this.assetService.getlinks();
  }
}
