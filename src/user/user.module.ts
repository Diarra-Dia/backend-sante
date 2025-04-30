import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule ],
  providers: [UserService],
  controllers: [UserController],
  exports: [TypeOrmModule,UserService],
})
export class UsersModule {}
