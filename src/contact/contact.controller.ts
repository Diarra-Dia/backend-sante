import { Controller, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('send')
  async sendMessage(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('message') message: string,
  ) {
    try {
      const createdMessage = await this.contactService.createMessage(name, email, message);
      return { success: true, message: 'Message envoyé avec succès', data: createdMessage };
    } catch (error) {
      return { success: false, message: 'Erreur lors de l\'envoi du message' };
    }
  }
}
