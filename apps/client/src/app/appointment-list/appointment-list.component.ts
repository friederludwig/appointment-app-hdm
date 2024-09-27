import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Appointment } from '@appointment-app-hdm/api-interfaces';
import { AppointmentsService } from '../services/appointments.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css',
})
export class AppointmentListComponent {
  appointments$!: Observable<Appointment[]>;

  constructor(private readonly appointmentsService: AppointmentsService) {
    this.appointments$ = this.appointmentsService.getAll();
  }
}
