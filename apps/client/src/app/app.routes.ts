import { Route } from '@angular/router';
import { AppointmentCreateRouteComponent } from './appointment/appointment-create-route/appointment-create-route.component';
import { AppointmentListComponent } from './appointment/appointment-list/appointment-list.component';
import { AppointmentDetailRouteComponent } from './appointment/appointment-detail-route/appointment-detail-route.component';

export const appRoutes: Route[] = [
  { path: 'appointments', component: AppointmentListComponent },
  { path: 'appointments/:id', component: AppointmentDetailRouteComponent },
  { path: 'appointment/create', component: AppointmentCreateRouteComponent },
];
