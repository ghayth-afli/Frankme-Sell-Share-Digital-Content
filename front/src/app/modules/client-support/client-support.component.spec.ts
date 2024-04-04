import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSupportComponent } from './client-support.component';

describe('ClientSupportComponent', () => {
  let component: ClientSupportComponent;
  let fixture: ComponentFixture<ClientSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientSupportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
