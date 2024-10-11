import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  Appointment,
  AppointmentStatusOptions,
} from '@appointment-app-hdm/api-interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppointmentsService } from '../../../services/appointments/appointments.service';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss'],
})
export class AppointmentListComponent implements OnInit {
  appointments$!: Observable<Appointment[]>;

  branches: string[] = ['Berlin', 'Dortmund'];
  selectedBranch: string | false = false;

  states = AppointmentStatusOptions;
  selectedStatus: AppointmentStatusOptions | false = false;

  constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.selectedBranch = params['branch'] || false;
      this.selectedStatus = params['status'] || false;
      this.loadAppointments();
    });
  }

  filterAppointments(
    appointments: Appointment[],
    branch: string | false,
    status: string | false
  ): Appointment[] {
    return appointments.filter((appointment) => {
      const matchesBranch = branch === false || appointment.branch === branch;
      const matchesStatus = status === false || appointment.status === status;
      return matchesBranch && matchesStatus;
    });
  }

  loadAppointments() {
    this.appointments$ = this.appointmentsService
      .getAll()
      .pipe(
        map((appointments) =>
          this.filterAppointments(
            appointments,
            this.selectedBranch,
            this.selectedStatus
          )
        )
      );
  }

  onBranchFilterChange(branch: string | false) {
    this.selectedBranch = branch;
    this.updateUrlParams();
  }

  onStatusFilterChange(status: AppointmentStatusOptions | false) {
    this.selectedStatus = status;
    this.updateUrlParams();
  }

  updateUrlParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        branch: this.selectedBranch !== false ? this.selectedBranch : null,
        status: this.selectedStatus !== false ? this.selectedStatus : null,
      },
      queryParamsHandling: 'merge', // keep existing params
    });
  }
}
