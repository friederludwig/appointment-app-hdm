import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Appointment, Branch } from '@appointment-app-hdm/api-interfaces';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { AppointmentsService } from '../../../services/appointments/appointments.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BranchesService } from '../../../services/branches/branches.service';

@Component({
  selector: 'app-appointment-create-route',
  standalone: true,
  imports: [CommonModule, AppointmentFormComponent],
  templateUrl: './appointment-create-route.component.html',
})
export class AppointmentCreateRouteComponent implements OnInit {
  branches$!: Observable<Branch[]>;

  constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly branchesService: BranchesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.branches$ = this.branchesService.getAll();
  }

  onCreate(candidate: Appointment) {
    this.appointmentsService.create(candidate).subscribe((newAppointment) => {
      this.router.navigate([`/appointments/${newAppointment.id}`]);
    });
  }
}
