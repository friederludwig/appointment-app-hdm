import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Appointment } from '@appointment-app-hdm/api-interfaces';
import { Observable } from 'rxjs';
import { AppointmentsService } from '../services/appointments.service';
import { AppointmentDetailViewComponent } from '../appointment-detail-view/appointment-detail-view.component';

@Component({
  selector: 'app-appointment-detail-route',
  standalone: true,
  imports: [CommonModule, AppointmentDetailViewComponent],
  templateUrl: './appointment-detail-route.component.html',
  styleUrl: './appointment-detail-route.component.scss',
})
export class AppointmentDetailRouteComponent implements OnInit {
  appointment!: Observable<Appointment>;
  @Input() id!: number;

  constructor(private readonly appointmentsService: AppointmentsService) {}

  ngOnInit() {
    this.appointment = this.appointmentsService.getById(this.id);
  }

  onUpdate(updatedAppointment: Partial<Appointment>) {
    if (updatedAppointment.id) {
      this.appointmentsService
        .updateById(updatedAppointment.id, updatedAppointment)
        .subscribe(console.log);
    }
  }

  onDelete(id: number) {
    this.appointmentsService.deleteById(id).subscribe(console.log);
  }
}
