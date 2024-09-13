import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/types/user-role.enum';
import { RolesValidationType } from '../common/types/roles-validation-type.enum';
import { RolesGuard } from '../common/guards/roles.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { GetUser } from '../common/decorators/current-user.decorator';
import { plainToClass } from 'class-transformer';
import { BasicUser } from './dto/basic-user.dto';
import { CurrentUser } from '../common/types/current-user.interface';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles([UserRole.Admin], RolesValidationType.HasAllOfThese)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles([UserRole.Admin], RolesValidationType.HasAllOfThese)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Roles([UserRole.User, UserRole.Admin], RolesValidationType.HasSomeOfThese)
  @Get('/me')
  @ApiProperty({
    description: 'Get info about logged in user',
    type: BasicUser,
  })
  async findMe(@GetUser() user: CurrentUser): Promise<BasicUser> {
    const userResponse = await this.usersService.findOneByEmail(user.email);

    return plainToClass(BasicUser, userResponse);
  }

  @Roles([UserRole.Admin], RolesValidationType.HasAllOfThese)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Roles([UserRole.Admin], RolesValidationType.HasAllOfThese)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Roles([UserRole.Admin], RolesValidationType.HasAllOfThese)
  @Patch(':id/role')
  @ApiProperty({
    description: 'Update role of the user',
  })
  updateRole(
    @Param('id') id: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return this.usersService.updateRole(id, updateUserRoleDto);
  }

  @Roles([UserRole.Admin], RolesValidationType.HasAllOfThese)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('init-users')
  @ApiOperation({
    summary: 'Backfill users',
    description:
      'Initializes the two initial users, one admin and one general user. To be used once when the database is empty',
  })
  backfillUsers() {
    return this.usersService.backfillUsers();
  }
}
