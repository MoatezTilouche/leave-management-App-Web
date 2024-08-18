import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAdmComponent } from './list-adm.component';

describe('ListAdmComponent', () => {
  let component: ListAdmComponent;
  let fixture: ComponentFixture<ListAdmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAdmComponent]
    });
    fixture = TestBed.createComponent(ListAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
