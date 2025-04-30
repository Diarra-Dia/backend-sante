import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/Message.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,  // Injecte la repo pour l'entité Message
  ) {}

  async createMessage(name: string, email: string, message: string): Promise<Message> {
    const newMessage = this.messageRepository.create({ name, email, message });
    try {
      return await this.messageRepository.save(newMessage);
    } catch (error) {
      throw new Error('Erreur lors de l\'envoi du message');
    }
  }
}
