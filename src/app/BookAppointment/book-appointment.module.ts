import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { BookAppointmentRoutingModule } from './book-appointment-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleComponent } from './schedule/schedule.component';
import { BookAppointmentComponent } from './book-appointment.component';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DrListComponent } from './dr-list/dr-list.component';
import { DrListPipe } from './dr-list.pipe';
import { EnterDetailsComponent } from './enter-details/enter-details.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { SkeletonDrListComponent } from './Skeleton/skeleton-dr-list/skeleton-dr-list.component';
import { SkeletonModule } from 'primeng/skeleton';
import { SkeletonScheduleComponent } from './Skeleton/skeleton-schedule/skeleton-schedule.component';
import { SkeletonSlotsComponent } from './Skeleton/skeleton-slots/skeleton-slots.component';


@NgModule({
  declarations: [
    ScheduleComponent,
    BookAppointmentComponent,
    DrListComponent,
    DrListPipe,
    EnterDetailsComponent,
    ViewProfileComponent,
    SkeletonDrListComponent,
    SkeletonScheduleComponent,
    SkeletonSlotsComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BookAppointmentRoutingModule,
    PanelModule,
    CardModule,
    TabViewModule,
    DialogModule,
    InputNumberModule,
    RouterModule,
    BreadcrumbModule,
    SkeletonModule,
  ],
  providers:[DatePipe]
})
export class BookAppointmentModule {}
