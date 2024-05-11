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
import { Event } from './entities/event.entity';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Link, User, File, Event]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    PaymentModule,
  ],
  controllers: [LinksController],
  providers: [LinksService, UsersService],
})
export class LinksModule {}
