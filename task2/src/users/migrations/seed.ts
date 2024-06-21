import { DataSource } from 'typeorm';
import { User } from '../user.entity';
import { Gender } from '../gender.enum';

export const seedUsers = async (dataSource: DataSource) => {
  const userRepository = dataSource.getRepository(User);

  const usersToInsert = [];
  for (let i = 0; i < 1000000; i++) {
    usersToInsert.push({
      firstName: `FirstName${i}`,
      lastName: `LastName${i}`,
      age: Math.floor(Math.random() * 100),
      gender: Math.random() > 0.5 ? Gender.MALE : Gender.FEMALE,
      hasProblems: Math.random() > 0.5,
    });

    if (usersToInsert.length === 10000) {
      await bulkInsert(userRepository, usersToInsert);
      usersToInsert.length = 0;
    }
  }

  if (usersToInsert.length > 0) {
    await bulkInsert(userRepository, usersToInsert);
  }
};

async function bulkInsert(repository, data) {
  const queryRunner = repository.manager.connection.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(data)
      .execute();

    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw err;
  } finally {
    await queryRunner.release();
  }
}
