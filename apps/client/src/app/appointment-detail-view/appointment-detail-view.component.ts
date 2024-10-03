import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Appointment } from '@appointment-app-hdm/api-interfaces';

@Component({
  selector: 'app-appointment-detail-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './appointment-detail-view.component.html',
  styleUrl: './appointment-detail-view.component.scss',
})
export class AppointmentDetailViewComponent implements OnInit {
  @Input() appointment!: Appointment;
  @Output() appointmentUpdated = new EventEmitter<Partial<Appointment>>();
  @Output() appointmentDeleted = new EventEmitter<number>();

  form!: FormGroup;

  //constructor() {} // private readonly openingHoursValidatorService: OpeningHoursValidatorService

  ngOnInit() {
    this.form = new FormGroup(
      {
        date: new FormControl(''),
        time: new FormControl(''),
        status: new FormControl(''),
        vehicleRegNo: new FormControl(''),
        vehicleOwner: new FormControl(''),
        branch: new FormControl(''),
        assignment: new FormControl(''),
      },
      null,
      [
        /*  this.openingHoursValidatorService.openingHoursValidator(
          'time',
          'branch'
        ), */
      ]
    );

    const formattedAppointment = {
      ...this.appointment,
      date: this.formatDate(this.appointment?.date || ''),
    };
    this.form.patchValue(formattedAppointment);
  }

  submit() {
    if (this.appointment.id) {
      // this.form.valid &&
      const updatedAppointment = this.form.value as Partial<Appointment>;
      this.appointmentUpdated.emit({
        id: this.appointment.id,
        ...updatedAppointment,
      });
    }
  }

  delete() {
    const confirm = window.confirm('Löschen?');
    if (confirm) {
      this.appointmentDeleted.emit(this.appointment.id);
    }
  }

  private formatDate(dateString: string): string {
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
  }
}
