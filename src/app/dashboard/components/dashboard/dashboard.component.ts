import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DashboardService } from '../../dashboard.service';
import { Bet } from '../../models/bet';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  bets$: Observable<Bet[]>;

  destroy$: Subject<boolean> = new Subject();

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.bets$ = this.dashboardService.getAllBets();
    this.dashboardService.startPulling(1).pipe(takeUntil(this.destroy$)).subscribe();
  }

  ngOnDestroy() {
    this.dashboardService.stopPulling().pipe(takeUntil(this.destroy$)).subscribe();
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
