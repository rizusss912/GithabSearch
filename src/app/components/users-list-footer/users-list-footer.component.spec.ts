import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListFooterComponent } from './users-list-footer.component';

describe('UsersListFooterComponent', () => {
  let component: UsersListFooterComponent;
  let fixture: ComponentFixture<UsersListFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersListFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
