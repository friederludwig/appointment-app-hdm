import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('branch')
export class BranchEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  city: string;

  @Column()
  openingHoursStart: string;

  @Column()
  openingHoursEnd: string;
}
