import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../../dashboard.service';
import { Bet } from '../../models/bet';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  bets$: Observable<Bet[]>;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.bets$ = this.dashboardService.getBets();
  }
}
