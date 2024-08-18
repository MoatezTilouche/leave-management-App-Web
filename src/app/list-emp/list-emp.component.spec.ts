import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEmpComponent } from './list-emp.component';

describe('ListEmpComponent', () => {
  let component: ListEmpComponent;
  let fixture: ComponentFixture<ListEmpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListEmpComponent]
    });
    fixture = TestBed.createComponent(ListEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
