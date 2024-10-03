import { DataSource } from 'typeorm';
import { AppointmentEntity } from '../../entities/appointment.entity';

export const DatabaseProvider = {
  provide: 'DATA_SOURCE',
  useFactory: async () => {
    const dataSource = new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'dev_user',
      password: 'Admin123',
      database: 'appointment-db',
      entities: [AppointmentEntity],
      synchronize: true,
    });

    return dataSource.initialize();
  },
};
