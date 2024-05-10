import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingNavComponent } from './setting-nav.component';

describe('SettingNavComponent', () => {
  let component: SettingNavComponent;
  let fixture: ComponentFixture<SettingNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
