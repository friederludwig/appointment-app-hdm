import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentCreateViewComponent } from '../appointment-create-view/appointment-create-view.component';
import { Appointment } from '@appointment-app-hdm/api-interfaces';
import { AppointmentsService } from '../services/appointments.service';

@Component({
  selector: 'app-appointment-create-route',
  standalone: true,
  imports: [CommonModule, AppointmentCreateViewComponent],
  templateUrl: './appointment-create-route.component.html',
  styleUrl: './appointment-create-route.component.scss',
})
export class AppointmentCreateRouteComponent {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  onCreate(candidate: Appointment) {
    this.appointmentsService.create(candidate).subscribe(console.log);
  }
}
