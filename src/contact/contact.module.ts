import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { Message } from './entities/Message.entity'; // <-- Ton entité ici

@Module({
  imports: [TypeOrmModule.forFeature([Message])], // <-- Important !!
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
