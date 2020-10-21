import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloaderGlobeComponent } from './preloader-globe.component';

describe('PreloaderGlobeComponent', () => {
  let component: PreloaderGlobeComponent;
  let fixture: ComponentFixture<PreloaderGlobeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreloaderGlobeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloaderGlobeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
