import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from '@appointment-app-hdm/api-interfaces';
import { Observable } from 'rxjs';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { AppointmentsService } from '../../services/appointments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-detail-route',
  standalone: true,
  imports: [CommonModule, AppointmentFormComponent],
  templateUrl: './appointment-detail-route.component.html',
  styleUrl: './appointment-detail-route.component.scss',
})
export class AppointmentDetailRouteComponent implements OnInit {
  appointment!: Observable<Appointment>;
  @Input() id!: number;

  constructor(
    private readonly appointmentsService: AppointmentsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.appointment = this.appointmentsService.getById(this.id);
  }

  onUpdate(updatedAppointment: Partial<Appointment>) {
    if (updatedAppointment.id) {
      this.appointmentsService
        .updateById(updatedAppointment.id, updatedAppointment)
        .subscribe(() => {
          this.router.navigate(['/appointments']);
        });
    }
  }

  onDelete(id: number) {
    this.appointmentsService.deleteById(id).subscribe(() => {
      this.router.navigate(['/appointments']);
    });
  }
}
