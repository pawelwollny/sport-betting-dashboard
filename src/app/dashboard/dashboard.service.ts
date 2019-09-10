import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Bet } from './models/bet';
import { OkResponse } from './models/ok-response';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient,
              private socket: Socket) {
  }

  getBets(): Observable<Bet[]> {
    return this.httpClient.get<any>(`${this.apiUrl}/bets`);
  }

  getBet(id: number): Observable<Bet> {
    return this.httpClient.get<any>(`${this.apiUrl}/bet/${id}`);
  }

  generateBets(size: number): Observable<Bet[]> {
    return this.httpClient.get<any>(`${this.apiUrl}/bets-generate?size=${size}`);
  }

  startPulling(rate: number): Observable<OkResponse> {
    return this.httpClient.get<any>(`${this.apiUrl}/pulling/start`, {params: { rate: `${rate}`}});
  }

  stopPulling(): Observable<OkResponse> {
    return this.httpClient.get<any>(`${this.apiUrl}/pulling/stop`);
  }

  getUpdatedOdds(): Observable<Bet[]> {
    return this.socket.fromEvent<any>('bet-updated');
  }

  getAllBets(): Observable<Bet[]> {
    const bets$ = this.getBets();
    const updatedBets$ = this.getUpdatedOdds();

    return combineLatest(bets$, updatedBets$).pipe(map(([bets, updatedBets]) =>
      bets.map(
        bet => updatedBets.find(updatedBet => updatedBet.id === bet.id) || bet
      )
    ));
  }
}
