import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AppointmentService } from '../appointment/appointment.service';
import { BranchService } from '../branch/branch.service';
import { User } from '@appointment-app-hdm/api-interfaces';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private appointmentService: AppointmentService,
    private branchService: BranchService
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findOneByEmail(email);
    if (user && pass === user.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      role: user.role,
      username: user.username,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateTokenAndOwnership(
    token: string,
    entityId: number,
    entityType: 'appointment' | 'branch'
  ) {
    const decoded = this.jwtService.decode(token);

    if (
      !decoded ||
      typeof decoded !== 'object' ||
      !decoded['id'] ||
      !decoded['role']
    ) {
      throw new UnauthorizedException('Invalid token');
    }

    const userIdFromToken = decoded['id'];
    const userRole = decoded['role'];

    if (userRole === 'admin') {
      return true;
    }

    if (entityType === 'appointment') {
      const appointment = await this.appointmentService.getById(entityId);

      if (!appointment) {
        throw new UnauthorizedException('Appointment not found');
      }

      if (appointment.createdByUser !== userIdFromToken) {
        throw new UnauthorizedException(
          'You are not authorized to update this appointment'
        );
      }
    } else if (entityType === 'branch') {
      const branch = await this.branchService.getById(entityId);

      if (!branch) {
        throw new UnauthorizedException('Branch not found');
      }
      throw new UnauthorizedException(
        'Only admins are authorized to update branches'
      );
    }

    return true;
  }
}
