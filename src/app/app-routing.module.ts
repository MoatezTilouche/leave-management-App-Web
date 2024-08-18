import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListEmpComponent } from './list-emp/list-emp.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AddEmpFormComponent } from './add-emp-form/add-emp-form.component';
import { RequestsComponent } from './requests/requests.component';
import { EmpRequestComponent } from './emp-request/emp-request.component';
import { EditEmpComponent } from './edit-emp/edit-emp.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminnotificationsComponent } from './adminnotifications/adminnotifications.component';
import { PendingLeavesComponent } from './pending-leaves/pending-leaves.component';
import { ListAdmComponent } from './list-adm/list-adm.component';
import { RequestsEmpComponent } from './requests-emp/requests-emp.component';
import { AddAdmComponent } from './add-adm/add-adm.component';
import { EditAdmComponent } from './edit-adm/edit-adm.component';

const routes: Routes = [
  {path:'login',component:LoginPageComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'dashboard',component:DashboardComponent},
  {path:'employes',component:ListEmpComponent},
  {path:'main',component:MainPageComponent},
  {path:'addEmp',component:AddEmpFormComponent},
  {path:'requests',component:RequestsComponent},
  {path:'empRequest/:requestId/:employeId',component:EmpRequestComponent},
  {path:'editEmp/:employeId',component:EditEmpComponent},
  {path:'calendar',component:CalendarComponent},
  {path:'profile/:adminId',component:ProfileComponent},
  {path:'notifications/:adminId',component:AdminnotificationsComponent},
  {path:'pendingleaves',component:PendingLeavesComponent},
  {path:'admins',component:ListAdmComponent},
  {path:'requestsEmp/:employeId',component:RequestsEmpComponent},
  {path:'addAdm',component:AddAdmComponent},
  {path:'editAdm/:adminId',component:EditAdmComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
