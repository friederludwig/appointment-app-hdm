import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Appointment, Branch } from '@appointment-app-hdm/api-interfaces';
import { Observable } from 'rxjs';
import { AppointmentsService } from '../../../services/appointments/appointments.service';
import { BranchesService } from '../../../services/branches/branches.service';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.scss',
})
export class AppointmentListComponent {
  appointments$!: Observable<Appointment[]>;

  constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly branchesService: BranchesService
  ) {
    this.appointments$ = this.appointmentsService.getAll();

    // const branch1: Branch = {
    //   id: 3,
    //   city: 'Memmingen',
    //   openingHoursStart: '09:00',
    //   openingHoursEnd: '11:00',
    // };

    // this.branchesService.getById(3).subscribe((result) => console.log(result));

    // this.branchesService.deleteById(3);

    // this.branchesService.updateById(3, branch1).subscribe((result) => {
    //   console.log(result);
    // });
  }
}
