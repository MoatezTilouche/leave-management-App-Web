import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminnotificationsComponent } from './adminnotifications.component';

describe('AdminnotificationsComponent', () => {
  let component: AdminnotificationsComponent;
  let fixture: ComponentFixture<AdminnotificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminnotificationsComponent]
    });
    fixture = TestBed.createComponent(AdminnotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
