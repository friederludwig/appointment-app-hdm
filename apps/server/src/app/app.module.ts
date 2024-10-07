import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { DatabaseProvider } from './modules/db/database.providers';
import { BranchModule } from './modules/branch/branch.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [AppointmentModule, BranchModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService, DatabaseProvider],
})
export class AppModule {}
