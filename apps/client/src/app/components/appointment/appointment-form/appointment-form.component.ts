import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Appointment,
  AppointmentStatusOptions,
} from '@appointment-app-hdm/api-interfaces';
import { validateUserPermissionsForAppointment } from '@appointment-app-hdm/shared';
import { OpeningHoursValidatorService } from '../../../services/opening-hours-validator/opening-hours-validator.service';
import { UserService } from '../../../services/user/user.service';
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

  form!: FormGroup;
  statusOptions = AppointmentStatusOptions;
  userAllowUpdate = false;

  constructor(
    private readonly openingHoursValidatorService: OpeningHoursValidatorService,
    private userService: UserService
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

    if (!this.appointment) {
      this.userAllowUpdate = true;
    }

    const currentUser = this.userService.getCurrentUser();

    if (currentUser) {
      this.userAllowUpdate = validateUserPermissionsForAppointment(
        this.appointment,
        currentUser
      );
    }
  }

  submit() {
    if (this.form.valid) {
      if (this.userAllowUpdate && this.appointment?.id) {
        const updatedAppointment = this.form.value as Partial<Appointment>;
        this.appointmentUpdated.emit({
          id: this.appointment.id,
          ...updatedAppointment,
        });
      } else {
        const newAppointment = this.form.value as Appointment;
        const currentUser = this.userService.getCurrentUser();
        if (currentUser?.id) {
          this.appointmentCreate.emit({
            ...newAppointment,
            createdByUser: currentUser.id,
          });
        }
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  delete() {
    const confirm = window.confirm(
      `Are you shure you want to delte: ${this.appointment.assignment}`
    );
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
