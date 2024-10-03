import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { DatabaseProvider } from './modules/db/database.providers';

@Module({
  imports: [AppointmentModule],
  controllers: [AppController],
  providers: [AppService, DatabaseProvider],
})
export class AppModule {}
