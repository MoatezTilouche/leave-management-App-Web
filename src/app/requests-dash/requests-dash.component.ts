import { Component, OnInit } from '@angular/core';
import { CongeService } from '../conge.service';
import { Conge } from '../models/conge';

@Component({
  selector: 'app-requests-dash',
  templateUrl: './requests-dash.component.html',
  styleUrls: ['./requests-dash.component.css']
})
export class RequestsDashComponent implements OnInit {
  conges: any[] = [];

  constructor(private congeService: CongeService) {}

  ngOnInit(): void {
    this.congeService.getAllConges().subscribe(data => {
      console.log('Received data:', data);
      this.conges = data;
      console.log('Mapped conges:', this.conges);
    });
  }
}
