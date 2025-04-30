import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity'; 
import { UserDto } from './dto/user.dto'; 

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Méthode pour créer un utilisateur
  async creerUtilisateur(data: UserDto): Promise<User> {
    const newUser = this.userRepository.create(data);
    return await this.userRepository.save(newUser);
  }

  // Méthode pour obtenir tous les utilisateurs
  async obtenirTousLesUtilisateurs(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // Méthode pour obtenir un utilisateur par ID
  async obtenirUnUtilisateur(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} introuvable.`);
    }

    return user;
  }

  // Méthode pour mettre à jour un utilisateur
  async mettreAJourUtilisateur(id: number, data: Partial<User>): Promise<User> {
    const updateResult = await this.userRepository.update(id, data);

    if (updateResult.affected === 0) {
      throw new NotFoundException(
        `Utilisateur avec l'ID ${id} introuvable pour la mise à jour.`,
      );
    }

    const updatedUser = await this.userRepository.findOne({ where: { id } });

    if (!updatedUser) {
      throw new NotFoundException(
        `Utilisateur avec l'ID ${id} introuvable après mise à jour.`,
      );
    }

    return updatedUser;
  }

  // Méthode pour supprimer un utilisateur
  async supprimerUtilisateur(id: number): Promise<void> {
    const deleteResult = await this.userRepository.delete(id);

    if (deleteResult.affected === 0) {
      throw new NotFoundException(
        `Utilisateur avec l'ID ${id} introuvable pour suppression.`,
      );
    }
  }

  // Méthode pour trouver un utilisateur par email
  // Méthode pour trouver un utilisateur par email
async userByEmail(email: string): Promise<User | undefined> {
  const user = await this.userRepository.findOne({ where: { email } });
  return user || undefined;  // Retourne undefined si aucun utilisateur n'est trouvé
}

}
