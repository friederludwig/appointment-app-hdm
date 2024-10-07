import { Route } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { AppointmentListComponent } from './components/appointment/appointment-list/appointment-list.component';
import { AppointmentDetailRouteComponent } from './components/appointment/appointment-detail-route/appointment-detail-route.component';
import { AppointmentCreateRouteComponent } from './components/appointment/appointment-create-route/appointment-create-route.component';
import { AuthGuard } from './guards/auth.guard';

export const appRoutes: Route[] = [
  {
    path: 'appointments',
    component: AppointmentListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'appointments/:id',
    component: AppointmentDetailRouteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'appointment/create',
    component: AppointmentCreateRouteComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
];
