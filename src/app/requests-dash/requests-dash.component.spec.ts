import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsDashComponent } from './requests-dash.component';

describe('RequestsDashComponent', () => {
  let component: RequestsDashComponent;
  let fixture: ComponentFixture<RequestsDashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestsDashComponent]
    });
    fixture = TestBed.createComponent(RequestsDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
