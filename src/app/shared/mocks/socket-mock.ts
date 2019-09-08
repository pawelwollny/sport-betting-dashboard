import { Observable, of } from 'rxjs';

import { betsMock } from './bets-mock';
import { Bet } from 'src/app/dashboard/models/bet';

export class SocketMock {
  fromEvent(eventName: string): Observable<Bet[]> {
    return of(betsMock);
  }
}
