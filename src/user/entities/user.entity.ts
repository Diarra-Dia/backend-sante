import { Entity, Column, PrimaryGeneratedColumn,OneToMany } from 'typeorm';
import { Appointment } from '../../appointment/entities/appointment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];

}
