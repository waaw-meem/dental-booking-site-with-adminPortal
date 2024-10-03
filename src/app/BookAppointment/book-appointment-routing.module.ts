import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookAppointmentComponent } from './book-appointment.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { DrListComponent } from './dr-list/dr-list.component';
import { EnterDetailsComponent } from './enter-details/enter-details.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { AppointmentComponent } from './appointment/appointment.component';

const routes: Routes = [
  {
    path: 'appointment',
    component: BookAppointmentComponent,
    children: [
      {
        path: 'doctors',
        component: DrListComponent,
      },
      {
        path: 'doctors/schedule',
        component: ScheduleComponent,
      },
      {
        path: 'doctors/schedule/:id',
        component: ScheduleComponent,
      },
      {
        path: 'doctors/enterDetails',
        component: EnterDetailsComponent,
      },
      {
        path: 'doctors/profile',
        component: ViewProfileComponent,
      },
      {
        path: 'doctors/booked',
        component: AppointmentComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookAppointmentRoutingModule {}
