import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFooterComponent } from './profile-footer.component';

describe('ProfileFooterComponent', () => {
  let component: ProfileFooterComponent;
  let fixture: ComponentFixture<ProfileFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileFooterComponent]
    });
    fixture = TestBed.createComponent(ProfileFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
