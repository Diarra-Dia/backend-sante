import { User } from '../../user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column()
  timeSlot: string; // Ex: "09:00-10:00"

  @Column()
  serviceType: string; // "consultation", "urgence", etc.

  @Column({ nullable: true })
  notes?: string;

  // Relation avec l'utilisateur (si votre système a une auth)
  @ManyToOne(() => User, user => user.appointments)
  @JoinColumn({ name: 'user_id' })
  user: User;
}