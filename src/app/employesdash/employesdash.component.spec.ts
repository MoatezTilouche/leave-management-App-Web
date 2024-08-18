import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployesdashComponent } from './employesdash.component';

describe('EmployesdashComponent', () => {
  let component: EmployesdashComponent;
  let fixture: ComponentFixture<EmployesdashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployesdashComponent]
    });
    fixture = TestBed.createComponent(EmployesdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
