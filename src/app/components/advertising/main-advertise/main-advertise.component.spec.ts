import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAdvertiseComponent } from './main-advertise.component';

describe('MainAdvertiseComponent', () => {
  let component: MainAdvertiseComponent;
  let fixture: ComponentFixture<MainAdvertiseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainAdvertiseComponent]
    });
    fixture = TestBed.createComponent(MainAdvertiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
