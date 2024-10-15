import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AppointmentModule } from '../appointment/appointment.module';
import { BranchModule } from '../branch/branch.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    forwardRef(() => AppointmentModule),
    forwardRef(() => BranchModule),
    JwtModule.register({
      secret: '11a24390-51d1-4db6-8102-a7f522b79c64',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
