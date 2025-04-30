import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly service: AppointmentService) {}

  @Post() 
  async create(@Body() dto: CreateAppointmentDto) {
    return this.service.create(dto);
  }

  @Get('slots')
  async getSlots(@Query('date') date: string) {
    return this.service.getAvailableSlots(new Date(date));
  }
}