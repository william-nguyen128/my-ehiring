import { mongoose } from '@typegoose/typegoose';
import { faker } from '@faker-js/faker';
import { UserGeneralDto } from './users/schemas/user-general.dto';
import { Logger } from '@nestjs/common';

const logger = new Logger('Seeder');

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    logger.log('Successfully connected to database');
  })
  .catch((err) => {
    logger.log(err);
  });

let seedUsers: UserGeneralDto[];

const seedDB = async () => {
  for (let i = 0; i < 5; i++) {
    let newUser: UserGeneralDto = { username: faker.internet.userName() };
    seedUsers.push(newUser);
  }
};

seedDB().then(() => {
  logger.log('Finished seeding!');
  mongoose.connection.close();
});
