import { Appointment } from '@appointment-app-hdm/api-interfaces';
import { Injectable } from '@nestjs/common';

const APPOINTMENTS: Appointment[] = [
  {
    id: 1,
    date: '24-02-2001',
    time: '19:00',
    status: 'Service',
    vehicleOwner: 'Max',
    vehicleRegNo: 'B-2024-PA',
    branch: 'Berlin',
    assignment: '000-000-01',
  },
  {
    id: 2,
    date: '24-02-2000',
    time: '18:00',
    status: 'Reparatur',
    vehicleOwner: 'Paul',
    vehicleRegNo: 'B-2024-PA',
    branch: 'Dortmund',
    assignment: '000-000-02',
  },
];

@Injectable()
export class AppointmentService {
  appointments = APPOINTMENTS;

  getAll(): Appointment[] {
    return this.appointments;
  }

  getById(id: number) {
    return this.appointments.find((appointment) => appointment.id === id);
  }

  updateById(id: number, appointment: Partial<Appointment>): Appointment {
    /*     const candidate: Appointment | undefined = this.appointments.find(
      (a) => a.id === id
    );
    if (candidate === undefined) {
      throw new Error(`no appointment with id ${id} found.`);
    }
    const patchedAppointment: Appointment = { ...candidate, ...appointment };
    const start =
      openingHoursPerBranch[patchedAppointment.branch].openingHoursStart;
    const end =
      openingHoursPerBranch[patchedAppointment.branch].openingHoursEnd;
    if (false === isTimeInInterval(patchedAppointment.time, start, end)) {
      throw new Error(
        `The time ${patchedAppointment.time} of the appointment is not within the opening hours (${start} - ${end})`
      );
    }

    this.appointments = this.appointments.map((a) =>
      a.id === id ? patchedAppointment : a
    );
    return patchedAppointment; */
    return;
  }

  deleteById(id: number) {
    this.appointments = this.appointments.filter(
      (appointment) => appointment.id !== id
    );
    console.log(this.appointments);
    return true;
  }
}
