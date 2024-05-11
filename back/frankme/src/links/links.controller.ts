import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { ActiveUser } from 'src/iam/authentication/decorators/active-user.decorator';
import { AuthType } from 'src/iam/authentication/enums/auth-type.enum';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { AccessTokenGuard } from 'src/iam/authentication/guards/access-token.guard';

@Auth(AuthType.Bearer)
@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}
  @UseGuards(AccessTokenGuard)
  @Post()
  create(
    @Body() createLinkDto: CreateLinkDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.linksService.create(createLinkDto, user);
  }
  @UseGuards(AccessTokenGuard)
  @Get('summary')
  summary(@ActiveUser() user: ActiveUserData) {
    return this.linksService.summary(user);
  }

  @Auth(AuthType.None)
  @Get('/download/:id')
  findLink(@Param('id') id: string, @Query('payment_id') paymentId?: string) {
    if (!paymentId) {
      return this.linksService.findByLinkId(id);
    } else {
      return this.linksService.findLinkVerifiedPayment(id, paymentId);
    }
  }
  @UseGuards(AccessTokenGuard)
  @Get()
  findAll(@ActiveUser() user: ActiveUserData) {
    return this.linksService.findAll(user);
  }
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: ActiveUserData) {
    return this.linksService.findOne(+id, user);
  }
  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLinkDto: UpdateLinkDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.linksService.update(+id, updateLinkDto, user);
  }
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: ActiveUserData) {
    return this.linksService.remove(+id, user);
  }
}
