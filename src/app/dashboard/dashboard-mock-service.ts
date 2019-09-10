import { Observable, of } from 'rxjs';

import { Bet } from 'src/app/dashboard/models/bet';

export class DashboardMockService {

  getAllBets(): Observable<Bet[]> {
    return of([]);
  }

  startPulling(rate: number): Observable<Bet[]> {
    return of([]);
  }
}
