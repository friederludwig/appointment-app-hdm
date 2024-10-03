import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Appointment } from '@appointment-app-hdm/api-interfaces';
import { Observable } from 'rxjs';
import { AppointmentsService } from '../../services/appointments.service';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.scss',
})
export class AppointmentListComponent {
  appointments$!: Observable<Appointment[]>;

  constructor(private readonly appointmentsService: AppointmentsService) {
    this.appointments$ = this.appointmentsService.getAll();
  }
}
