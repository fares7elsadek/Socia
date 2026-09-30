import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service.js';
import { AuthController } from './controllers/auth.controller.js';
import { UsersModule } from '../users/users.module.js';
import { LocalStrategy } from './strategies/auth.localstrategy.js';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy.js';

@Module({
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers: [AuthController],
  imports:[
    UsersModule,
    JwtModule.register({
      secret:"fares",
      signOptions: {expiresIn: '60s'}
    })
  ]
})
export class AuthModule {}
