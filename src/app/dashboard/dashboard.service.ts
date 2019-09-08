import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, of } from 'rxjs';

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

  generateBets(): Observable<Bet[]> {
    return of(null);
  }

  startPulling(rate: string): Observable<OkResponse> {
    return this.httpClient.get<any>(`${this.apiUrl}/pulling/start`, {params: {rate}});
  }

  stopPulling(): Observable<OkResponse> {
    return this.httpClient.get<any>(`${this.apiUrl}/pulling/stop`);
  }

  getUpdatedOdds(): Observable<Bet[]> {
    return this.socket.fromEvent<any>('bet-updated');
  }
}
