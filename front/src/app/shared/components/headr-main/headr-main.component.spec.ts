import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadrMainComponent } from './headr-main.component';

describe('HeadrMainComponent', () => {
  let component: HeadrMainComponent;
  let fixture: ComponentFixture<HeadrMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeadrMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeadrMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
