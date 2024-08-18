import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsEmpComponent } from './requests-emp.component';

describe('RequestsEmpComponent', () => {
  let component: RequestsEmpComponent;
  let fixture: ComponentFixture<RequestsEmpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestsEmpComponent]
    });
    fixture = TestBed.createComponent(RequestsEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
