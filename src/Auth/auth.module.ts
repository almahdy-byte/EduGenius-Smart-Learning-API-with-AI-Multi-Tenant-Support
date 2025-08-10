import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepo , UserModel } from 'src/DB/Models/User';
import { TokenService } from '../Common';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService , UserRepo  , TokenService , JwtService ],
  imports:[UserModel]
})
export class AuthModule {}
