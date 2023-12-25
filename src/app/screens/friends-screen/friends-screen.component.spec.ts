import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsScreenComponent } from './friends-screen.component';

describe('FriendsScreenComponent', () => {
  let component: FriendsScreenComponent;
  let fixture: ComponentFixture<FriendsScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FriendsScreenComponent]
    });
    fixture = TestBed.createComponent(FriendsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
