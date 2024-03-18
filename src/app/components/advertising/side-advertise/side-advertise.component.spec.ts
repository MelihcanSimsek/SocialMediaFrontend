import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideAdvertiseComponent } from './side-advertise.component';

describe('SideAdvertiseComponent', () => {
  let component: SideAdvertiseComponent;
  let fixture: ComponentFixture<SideAdvertiseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideAdvertiseComponent]
    });
    fixture = TestBed.createComponent(SideAdvertiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
