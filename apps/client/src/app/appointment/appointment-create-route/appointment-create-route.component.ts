import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Appointment } from '@appointment-app-hdm/api-interfaces';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { AppointmentsService } from '../../services/appointments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-create-route',
  standalone: true,
  imports: [CommonModule, AppointmentFormComponent],
  templateUrl: './appointment-create-route.component.html',
  styleUrl: './appointment-create-route.component.scss',
})
export class AppointmentCreateRouteComponent {
  constructor(
    private readonly appointmentsService: AppointmentsService,
    private router: Router
  ) {}

  onCreate(candidate: Appointment) {
    this.appointmentsService.create(candidate).subscribe(() => {
      this.router.navigate(['/appointments']);
    });
  }
}
