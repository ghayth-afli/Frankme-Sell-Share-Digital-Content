import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import { IamModule } from './iam/iam.module';
import * as process from "process";

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),UsersModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.username,
    password: process.env.password,
    database: 'postgres',
    autoLoadEntities: true,
    synchronize: true
  }), IamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
