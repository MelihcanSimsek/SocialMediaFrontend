import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardScreenComponent } from './dashboard-screen.component';

describe('DashboardScreenComponent', () => {
  let component: DashboardScreenComponent;
  let fixture: ComponentFixture<DashboardScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardScreenComponent]
    });
    fixture = TestBed.createComponent(DashboardScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
