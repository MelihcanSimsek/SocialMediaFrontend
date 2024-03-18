import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseScreenComponent } from './advertise-screen.component';

describe('AdvertiseScreenComponent', () => {
  let component: AdvertiseScreenComponent;
  let fixture: ComponentFixture<AdvertiseScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvertiseScreenComponent]
    });
    fixture = TestBed.createComponent(AdvertiseScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
