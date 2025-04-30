import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contact/contact.module';
import { Message } from './contact/entities/Message.entity';
import { AppointmentModule } from './appointment/appointment.module';
import { Appointment } from './appointment/entities/appointment.entity';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'sante',
      entities: [User,Message,Appointment],
      synchronize: true,
      logging: true,
      logger: 'advanced-console',
    }),
    TypeOrmModule.forFeature([]),
    UsersModule,
    AuthModule,
    ContactModule,
    AppointmentModule,
    
  ],
  
})

export class AppModule {}
