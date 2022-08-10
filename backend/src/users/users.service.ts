import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { UserGeneralDto } from './schemas/user-general.dto';
import { User } from './schemas/user.schema';
import { faker } from '@faker-js/faker';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel('User') private userModel: ReturnModelType<typeof User>,
  ) {}

  async getUsers(): Promise<User[]> {
    this.logger.log('Returning all users');
    return await this.userModel.find().exec();
  }

  async getUserById(userId: string): Promise<User> {
    const foundUser = await this.userModel.findById(userId);
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    this.logger.log(`Returning all fields of user of ID: ${userId}`);
    return foundUser;
  }

  async updateUser(userId: string, updatedUser: UserGeneralDto): Promise<User> {
    const foundUser = await this.userModel.findByIdAndUpdate(
      userId,
      updatedUser,
      {
        new: true,
      },
    );
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    this.logger.log(`Updating user of ID: ${userId}`);
    return foundUser;
  }

  async deleteUser(userId: string): Promise<User> {
    const foundUser = await this.userModel.findByIdAndDelete(userId);
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    this.logger.log(`Deleting user of ID: ${userId}`);
    return foundUser;
  }

  async createUser(createdUser: UserGeneralDto): Promise<User> {
    this.logger.log('Creating a new user');
    const newUser = await new this.userModel(createdUser);
    return newUser.save();
  }

  async seedUsers(numberOfUsers: number): Promise<User> {
    await this.userModel.deleteMany();
    this.logger.log('Seeding users...');
    for (let i = 0; i < numberOfUsers; i++) {
      const generatedUser: UserGeneralDto = {
        username: faker.internet.userName(),
      };
      await new this.userModel(generatedUser).save();
    }
    this.logger.log('Users seeded successfully!');
    return;
  }
}
