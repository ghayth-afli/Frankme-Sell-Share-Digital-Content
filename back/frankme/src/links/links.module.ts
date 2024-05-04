import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/iam/config/jwt.config';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { File } from './entities/file.entity';
import { LinkSubscriber } from './link.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([Link, User, File]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [LinksController],
  providers: [LinksService, UsersService, LinkSubscriber],
})
export class LinksModule {}
