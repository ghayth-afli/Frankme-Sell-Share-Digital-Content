import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/iam/config/jwt.config';
import { AccessTokenGuard } from 'src/iam/authentication/guards/access-token.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class UsersModule {}
