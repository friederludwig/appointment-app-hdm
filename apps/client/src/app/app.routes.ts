import { Route } from '@angular/router';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentDetailRouteComponent } from './appointment-detail-route/appointment-detail-route.component';
import { AppointmentCreateRouteComponent } from './appointment-create-route/appointment-create-route.component';

export const appRoutes: Route[] = [
  { path: 'appointments', component: AppointmentListComponent },
  { path: 'appointments/:id', component: AppointmentDetailRouteComponent },
  { path: 'appointment/create', component: AppointmentCreateRouteComponent },
];
