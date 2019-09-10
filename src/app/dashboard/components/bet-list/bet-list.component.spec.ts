import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetListComponent } from './bet-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { of } from 'rxjs';
import { betsMock } from 'src/app/shared/mocks/bets-mock';

describe('BetListComponent', () => {
  let component: BetListComponent;
  let fixture: ComponentFixture<BetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetListComponent ],
      imports: [ SharedModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetListComponent);
    component = fixture.componentInstance;
    component.bets$ = of(betsMock);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render bets in a table', () => {
    const compiled = fixture.debugElement.nativeElement;
    const firstTableRow = compiled.querySelector('tr.mat-row');

    expect(firstTableRow.children[0].textContent).toContain('YBN Perc');
    expect(firstTableRow.children[1].textContent).toContain('4.94');
    expect(firstTableRow.children[2].textContent).toContain('8.75');
    expect(firstTableRow.children[3].textContent).toContain('2.01');
    expect(firstTableRow.children[4].textContent).toContain('YBN Xan Door');
  });
});
