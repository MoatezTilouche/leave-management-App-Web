import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

interface CongeWithEmploye {
  conge: {
    _id: string;
    dateDebut: string;
    dateFin: string;
    typeConge: string;
  };
  employeName: {
    _id: string;
    name: string;
  };
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    events: [],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventColor: '#378006' // Default event color, can be overridden
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAcceptedLeaves();
  }

  loadAcceptedLeaves() {
    this.http.get<CongeWithEmploye[]>('http://localhost:3000/conges/accepted')
      .subscribe(
        data => {
          console.log('Data retrieved from API:', data); // Log the retrieved data
          
          const events = data.map(conge => ({
            id: conge?.conge?._id || 'No ID',
            title: `${conge?.employeName?.name || 'Unknown'} - ${conge?.conge?.typeConge || 'Unknown type'}`, // Corrected access
            start: conge?.conge?.dateDebut || new Date().toISOString(),
            end: conge?.conge?.dateFin || new Date().toISOString(),
            backgroundColor: this.getEventColor(conge?.conge?.typeConge)
          }));
          
          console.log('Events generated:', events); // Log the generated events array
          this.calendarOptions.events = events;
        },
        error => {
          console.error('Error retrieving data:', error); // Log any errors
        }
      );
  }

  handleDateClick(arg: any) {
    const dateStr = arg?.dateStr || 'Unknown date';
    console.log('Date clicked:', dateStr); // Log the clicked date
    alert('Date clicked: ' + dateStr);
  }

  handleEventClick(arg: any) {
    const eventTitle = arg?.event?.title || 'No title';
    const eventStart = arg?.event?.start?.toISOString() || 'No start date';
    const eventEnd = arg?.event?.end?.toISOString() || 'No end date';

    console.log('Event clicked:', {
      title: eventTitle,
      start: eventStart,
      end: eventEnd
    }); // Log the clicked event details

    alert(`Event clicked:\nTitle: ${eventTitle}\nStart: ${eventStart}\nEnd: ${eventEnd}`);
  }

  getEventColor(type: string): string {
    switch (type) {
      case 'Vacation':
        return '#28a745'; // green
      case 'Maladie':
        return '#dc3545'; // red
      case 'Parental':
        return '#ffc107'; // yellow
      case 'Formation':
        return '#007bff'; // blue
      case 'Annuel':
        return '#fd7e14'; // orange
      case 'Maternité':
        return '#e83e8c'; // pink
      case 'Autre':
        return '#6c757d'; // gray
      case 'Congé sabbatique':
        return '#20c997'; // teal
      case 'Congé sans solde':
        return '#6610f2'; // indigo
      case 'Congé parental':
        return '#cddc39'; // lime
      case 'Congé d\'études':
        return '#ffc107'; // amber
      case 'Evénements familiaux':
        return '#e83e8c'; // rose
      default:
        return '#007bff'; // blue
    }
  }
}
