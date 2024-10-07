import { DataSource } from 'typeorm';
import { AppointmentEntity } from '../../entities/appointment.entity';
import { UserEntity } from '../../entities/user.entity';

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
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      entities: [AppointmentEntity, UserEntity],
      synchronize: true,
    });

    return dataSource.initialize();
  },
};
