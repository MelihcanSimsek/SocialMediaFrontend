import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePostComponent } from './home-post.component';

describe('HomePostComponent', () => {
  let component: HomePostComponent;
  let fixture: ComponentFixture<HomePostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePostComponent]
    });
    fixture = TestBed.createComponent(HomePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
