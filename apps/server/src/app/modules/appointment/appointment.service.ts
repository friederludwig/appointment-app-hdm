import { Appointment } from '@appointment-app-hdm/api-interfaces';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AppointmentEntity } from '../../entities/appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @Inject('APPOINTMENT_REPOSITORY')
    private appointmentRepository: Repository<AppointmentEntity>
  ) {}

  async getAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find();
  }

  async getById(id: number): Promise<Appointment> {
    return this.appointmentRepository.findOne({ where: { id } });
  }

  async create(createData: Partial<Appointment>): Promise<Appointment> {
    const candidate = this.appointmentRepository.create(createData);
    return this.appointmentRepository.save(candidate);
  }

  async updateById(
    id: number,
    appointment: Partial<Appointment>
  ): Promise<Appointment> {
    const candidate = await this.appointmentRepository.findOne({
      where: { id },
    });

    if (!candidate) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    const patchedAppointment: Appointment = { ...candidate, ...appointment };
    return this.appointmentRepository.save(patchedAppointment);
  }

  async deleteById(id: number): Promise<void> {
    const result = await this.appointmentRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
  }
}

/*     const candidate: Appointment | undefined = this.appointmentRepository.find(
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

    this.appointmentRepository = this.appointmentRepository.map((a) =>
      a.id === id ? patchedAppointment : a
    );
    return patchedAppointment; */
