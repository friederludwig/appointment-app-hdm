import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointment')
export class AppointmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'text' })
  time: string;

  @Column({ type: 'text' })
  status: string;

  @Column({ type: 'text' })
  vehicleRegNo: string;

  @Column({ type: 'text' })
  vehicleOwner: string;

  @Column({ type: 'text' })
  branch: string;

  @Column({ type: 'text' })
  assignment: string;
}
