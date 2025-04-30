import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentService {
  private readonly logger = new Logger(AppointmentService.name);

  constructor(
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,
  ) {}

  async create(dto: CreateAppointmentDto) {
    const appointment = this.appointmentRepo.create({
      ...dto,
      date: new Date(dto.date) 
    });
    return this.appointmentRepo.save(appointment);
  }
  async getAvailableSlots(date: Date): Promise<string[]> {
    const existingAppointments = await this.appointmentRepo.find({
      where: {
        date: Between(
          new Date(date.setHours(0, 0, 0, 0)),
          new Date(date.setHours(23, 59, 59, 999))
        )
      }
    });

    return this.generateTimeSlots().filter(slot => 
      !existingAppointments.some(app => app.timeSlot === slot)
    );
  }

  private generateTimeSlots(): string[] {
    return [
      '09:00-10:00', 
      '10:00-11:00',
      '11:00-12:00',
      '14:00-15:00',
      '15:00-16:00',
      '16:00-17:00'
    ];
  }
}