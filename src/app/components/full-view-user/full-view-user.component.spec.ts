import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullViewUserComponent } from './full-view-user.component';

describe('FullViewUserComponent', () => {
  let component: FullViewUserComponent;
  let fixture: ComponentFixture<FullViewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullViewUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullViewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
