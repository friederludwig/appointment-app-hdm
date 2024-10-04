import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Appointment } from '@appointment-app-hdm/api-interfaces';
import { ButtonComponent } from '../../button/button.component';
import { OpeningHoursValidatorService } from '../../services/opening-hours-validator.service';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss',
})
export class AppointmentFormComponent implements OnInit {
  @Input() appointment!: Appointment;
  @Output() appointmentUpdated = new EventEmitter<Partial<Appointment>>();
  @Output() appointmentDeleted = new EventEmitter<number>();
  @Output() appointmentCreate = new EventEmitter<Appointment>();

  form!: FormGroup;

  constructor(
    private readonly openingHoursValidatorService: OpeningHoursValidatorService
  ) {}

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
        this.openingHoursValidatorService.openingHoursValidator(
          'time',
          'branch'
        ),
      ]
    );
    this.form.patchValue(this.appointment);
  }

  submit() {
    if (this.form.invalid) return;

    if (this.appointment?.id) {
      const updatedAppointment = this.form.value as Partial<Appointment>;
      this.appointmentUpdated.emit({
        id: this.appointment.id,
        ...updatedAppointment,
      });
    } else {
      const updatedAppointment = this.form.value as Appointment;
      this.appointmentCreate.emit(updatedAppointment);
    }
  }

  delete() {
    const confirm = window.confirm('Löschen?');
    if (confirm) {
      this.appointmentDeleted.emit(this.appointment.id);
    }
  }
}
