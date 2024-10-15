import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from '@appointment-app-hdm/api-interfaces';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';

@Controller('appointment')
export class AppointmentController {
  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly authService: AuthService
  ) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  GetData() {
    return this.appointmentService.getAll();
  }
  @Get(':id')
  GetById(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentService.getById(id);
  }

  @Post()
  async createAppointment(
    @Body() body: { appointment: Partial<Appointment> }
  ): Promise<Appointment> {
    const appointmentData = body.appointment;
    return this.appointmentService.create(appointmentData);
  }

  @Patch(':id')
  async PatchById(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAppointment: Partial<Appointment>
  ) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];

    // Verwende AuthService, um die Berechtigungen für das Appointment zu überprüfen
    await this.authService.validateTokenAndOwnership(token, id, 'appointment');

    // Wenn die Überprüfung erfolgreich war, wird das Appointment aktualisiert
    return this.appointmentService.updateById(id, updateAppointment);
  }

  @Delete(':id')
  DeleteById(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentService.deleteById(id);
  }
}
