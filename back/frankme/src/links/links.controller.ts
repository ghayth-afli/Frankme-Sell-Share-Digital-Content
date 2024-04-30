import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { ActiveUser } from 'src/iam/authentication/decorators/active-user.decorator';
import { AuthType } from 'src/iam/authentication/enums/auth-type.enum';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';

@Auth(AuthType.Bearer)
@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post()
  create(
    @Body() createLinkDto: CreateLinkDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.linksService.create(createLinkDto, user);
  }

  @Get()
  findAll(@ActiveUser() user: ActiveUserData) {
    return this.linksService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: ActiveUserData) {
    return this.linksService.findOne(+id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLinkDto: UpdateLinkDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.linksService.update(+id, updateLinkDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: ActiveUserData) {
    return this.linksService.remove(+id, user);
  }
}
