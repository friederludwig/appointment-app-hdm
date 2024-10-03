import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from '@appointment-app-hdm/api-interfaces';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly AppointmentService: AppointmentService) {}

  @Get()
  GetData() {
    return this.AppointmentService.getAll();
  }

  @Get(':id')
  GetById(@Param('id', ParseIntPipe) id: number) {
    return this.AppointmentService.getById(id);
  }

  @Post()
  async createAppointment(
    @Body() body: { appointment: Partial<Appointment> }
  ): Promise<Appointment> {
    const appointmentData = body.appointment;
    console.log(appointmentData);
    return this.AppointmentService.create(appointmentData);
  }

  @Patch(':id')
  async PatchById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAppointment: Partial<Appointment>
  ) {
    return this.AppointmentService.updateById(id, updateAppointment);
  }

  @Delete(':id')
  DeleteById(@Param('id', ParseIntPipe) id: number) {
    return this.AppointmentService.deleteById(id);
  }
}
