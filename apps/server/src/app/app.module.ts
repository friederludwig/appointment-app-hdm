import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { DatabaseProvider } from './modules/db/database.providers';
import { BranchModule } from './modules/branch/branch.module';

@Module({
  imports: [AppointmentModule, BranchModule],
  controllers: [AppController],
  providers: [AppService, DatabaseProvider],
})
export class AppModule {}
