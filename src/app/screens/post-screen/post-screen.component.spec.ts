import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostScreenComponent } from './post-screen.component';

describe('PostScreenComponent', () => {
  let component: PostScreenComponent;
  let fixture: ComponentFixture<PostScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostScreenComponent]
    });
    fixture = TestBed.createComponent(PostScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
