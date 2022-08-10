import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserGeneralDto } from './schemas/user-general.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.getUsers();
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'User not found' })
  async getSingleUser(@Param('id') userId: string): Promise<User> {
    return await this.usersService.getUserById(userId);
  }

  @Put(':id')
  @ApiBadRequestResponse({ description: 'Invalid input(s)' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async updateUser(
    @Body() updatedUser: UserGeneralDto,
    @Param('id') userId: string,
  ): Promise<User> {
    return await this.usersService.updateUser(userId, updatedUser);
  }

  @Delete(':id')
  @ApiBadRequestResponse({ description: 'username should not be empty' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async deleteUser(@Param('id') userId: string): Promise<User> {
    return await this.usersService.deleteUser(userId);
  }

  @Post()
  @ApiBadRequestResponse({ description: 'username should not be empty' })
  async createUser(@Body() newUser: UserGeneralDto): Promise<User> {
    return await this.usersService.createUser(newUser);
  }

  @Post('seed/:amount')
  async seedUsers(@Param('amount') numberOfUsers: number): Promise<User> {
    return await this.usersService.seedUsers(numberOfUsers);
  }
}
