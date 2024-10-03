import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Appointment } from '@appointment-app-hdm/api-interfaces';

@Component({
  selector: 'app-appointment-create-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './appointment-create-view.component.html',
  styleUrl: './appointment-create-view.component.scss',
})
export class AppointmentCreateViewComponent implements OnInit {
  @Output() appointmentCreate = new EventEmitter<Appointment>();

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
  }

  submit() {
    if (this.form.valid) {
      const candidate = this.form.value as Appointment;
      console.log(candidate);
      this.appointmentCreate.emit(candidate);
    }
  }
}
