import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PiechartComponent } from './piechart/piechart.component';
import { ListEmpComponent } from './list-emp/list-emp.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RequestChartComponent } from './request-chart/request-chart.component';
import { RequestsDashComponent } from './requests-dash/requests-dash.component';
import { EmployesdashComponent } from './employesdash/employesdash.component';
import { AddEmpFormComponent } from './add-emp-form/add-emp-form.component';
import { RequestsComponent } from './requests/requests.component';
import { EmpRequestComponent } from './emp-request/emp-request.component';
import { EditEmpComponent } from './edit-emp/edit-emp.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ProfileComponent } from './profile/profile.component';
import { AdminnotificationsComponent } from './adminnotifications/adminnotifications.component';
import { PendingLeavesComponent } from './pending-leaves/pending-leaves.component';
import { ListAdmComponent } from './list-adm/list-adm.component';
import { RequestsEmpComponent } from './requests-emp/requests-emp.component';
import { AddAdmComponent } from './add-adm/add-adm.component';
import { EditAdmComponent } from './edit-adm/edit-adm.component'; // import the FullCalendar module

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardComponent,
    SidebarComponent,
    NavbarComponent,
    PiechartComponent,
    ListEmpComponent,
    MainPageComponent,
    RequestChartComponent,
    RequestsDashComponent,
    EmployesdashComponent,
    AddEmpFormComponent,
    RequestsComponent,
    EmpRequestComponent,
    EditEmpComponent,
    CalendarComponent,
    ProfileComponent,
    AdminnotificationsComponent,
    PendingLeavesComponent,
    ListAdmComponent,
    RequestsEmpComponent,
    AddAdmComponent,
    EditAdmComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule, 
    FullCalendarModule ,


    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),

    

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
