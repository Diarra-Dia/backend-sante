import { IsDateString, IsString, IsNotEmpty, IsOptional, IsISO8601 } from 'class-validator';

export class CreateAppointmentDto {
  @IsISO8601({ strict: false }) // Accepte plus de formats
  @IsNotEmpty()
  date: string; // Laissez en string et transformez après validation


  @IsString()
  @IsNotEmpty()
  timeSlot: string;

  @IsString()
  @IsNotEmpty()
  serviceType: string;

  // Ajoutez ces champs avec les validateurs appropriés
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsOptional()
  notes?: string;
}