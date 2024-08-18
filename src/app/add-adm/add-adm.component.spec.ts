import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdmComponent } from './add-adm.component';

describe('AddAdmComponent', () => {
  let component: AddAdmComponent;
  let fixture: ComponentFixture<AddAdmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAdmComponent]
    });
    fixture = TestBed.createComponent(AddAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
