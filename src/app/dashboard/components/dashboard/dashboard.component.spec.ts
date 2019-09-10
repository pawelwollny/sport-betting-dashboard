import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { DashboardService } from '../../dashboard.service';
import { DashboardMockService } from 'src/app/dashboard/dashboard-mock-service';
import { BetListComponent } from '../bet-list/bet-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent, BetListComponent ],
      imports: [ SharedModule ],
      providers: [{ provide: DashboardService, useClass: DashboardMockService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
