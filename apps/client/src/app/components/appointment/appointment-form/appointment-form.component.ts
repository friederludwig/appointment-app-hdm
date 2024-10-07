import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Appointment } from '@appointment-app-hdm/api-interfaces';
import { OpeningHoursValidatorService } from '../../../services/opening-hours-validator/opening-hours-validator.service';
import { ButtonComponent } from '../../system/button/button.component';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss',
})
export class AppointmentFormComponent implements OnInit {
  @Input() title!: string;
  @Input() appointment!: Appointment;
  @Output() appointmentUpdated = new EventEmitter<Partial<Appointment>>();
  @Output() appointmentDeleted = new EventEmitter<number>();
  @Output() appointmentCreate = new EventEmitter<Appointment>();

  statusOptions: string[] = ['Pending', 'Approved', 'Rejected', 'In Progress'];
  form!: FormGroup;

  constructor(
    private readonly openingHoursValidatorService: OpeningHoursValidatorService
  ) {}

  ngOnInit() {
    this.form = new FormGroup(
      {
        date: new FormControl('', [Validators.required]),
        time: new FormControl('', [Validators.required]),
        status: new FormControl('', [Validators.required]),
        vehicleRegNo: new FormControl('', [Validators.required]),
        vehicleOwner: new FormControl('', [Validators.required]),
        branch: new FormControl('', [Validators.required]),
        assignment: new FormControl('', [Validators.required]),
      },
      null,
      [
        this.openingHoursValidatorService.openingHoursValidator(
          'time',
          'branch'
        ),
      ]
    );

    if (this.appointment) {
      this.form.patchValue(this.appointment);
    }
  }

  submit() {
    if (this.form.valid) {
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
    } else {
      this.form.markAllAsTouched();
    }
  }

  delete() {
    const confirm = window.confirm('Delete?');
    if (confirm) {
      this.appointmentDeleted.emit(this.appointment.id);
    }
  }

  fieldError(control: string) {
    return (
      this.form.get(control)?.invalid &&
      (this.form.get(control)?.touched || this.form.get(control)?.dirty)
    );
  }
}
