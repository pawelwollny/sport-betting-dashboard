import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { Socket } from 'ngx-socket-io';

import { environment } from 'src/environments/environment';
import { betsMock } from '../shared/mocks/bets-mock';
import { SocketMock } from '../shared/mocks/socket-mock';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [{ provide: Socket, useClass: SocketMock } ]
    });

    const httpClient = TestBed.get(HttpClient);
    const socket = TestBed.get(Socket);

    service = new DashboardService(httpClient, socket);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expect bets to be equal to mocked bets', async(() => {
    service.getBets().subscribe(
      bets => {
        expect(bets.length).toBe(4);
        expect(bets).toEqual(betsMock);
      }
    );

    const request = httpTestingController.expectOne(`${environment.apiUrl}/bets`);

    expect(request.request.method).toBe('GET');

    request.flush(betsMock);
  }));

  it('expect bet to be equal to mocked bet', async(() => {
    service.getBet(0).subscribe(
      bet => expect(bet).toEqual(betsMock[0])
    );

    const request = httpTestingController.expectOne(`${environment.apiUrl}/bet/0`);

    expect(request.request.method).toBe('GET');

    request.flush(betsMock[0]);
  }));

  it('expect websocket pulling to start', async(() => {
      service.startPulling(2).subscribe(
        response => expect(response).toEqual({ok: 1})
      );

      const request = httpTestingController.expectOne(`${environment.apiUrl}/pulling/start?rate=2`);

      expect(request.request.method).toBe('GET');

      request.flush({ok: 1});
  }));

  it('expect websocket pulling to stop', async(() => {
    service.stopPulling().subscribe(
      response => expect(response).toEqual({ok: 1})
    );

    const request = httpTestingController.expectOne(`${environment.apiUrl}/pulling/stop`);

    expect(request.request.method).toBe('GET');

    request.flush({ok: 1});
  }));

  it('expect updated bets to be equal to mocked bets', async(() => {
    service.getUpdatedOdds().subscribe(updatedOdds => {
      expect(updatedOdds).toEqual(betsMock);
    });
  }));
});
