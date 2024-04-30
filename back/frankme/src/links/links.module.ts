import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/iam/config/jwt.config';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from 'src/iam/authentication/guards/access-token.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Link]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [LinksController],
  providers: [
    LinksService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class LinksModule {}
