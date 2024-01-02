import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnbanComponent } from './unban.component';

describe('UnbanComponent', () => {
  let component: UnbanComponent;
  let fixture: ComponentFixture<UnbanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnbanComponent]
    });
    fixture = TestBed.createComponent(UnbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
