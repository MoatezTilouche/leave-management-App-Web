import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestChartComponent } from './request-chart.component';

describe('RequestChartComponent', () => {
  let component: RequestChartComponent;
  let fixture: ComponentFixture<RequestChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestChartComponent]
    });
    fixture = TestBed.createComponent(RequestChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
