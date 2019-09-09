import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

import { Bet } from '../../models/bet';

@Component({
  selector: 'app-bet-list',
  templateUrl: './bet-list.component.html',
  styleUrls: ['./bet-list.component.scss']
})
export class BetListComponent implements OnInit {

  @Input() bets$: Observable<Bet[]>;

  dataSource: MatTableDataSource<Bet>;

  readonly displayedColumns: string[] = ['firstTeam', 'firstTeamWinRate', 'drawRate',
                                         'secondTeamWinRate', 'secondTeam'];

  constructor() { }

  ngOnInit() {
  }
}
