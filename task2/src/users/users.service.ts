import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async resetProblemsFlag(): Promise<number> {
    const updateResult = await this.userRepository.update(
      { hasProblems: true },
      { hasProblems: false },
    );
    return updateResult.affected ?? 0;
  }

  async setRandomProblemsFlag(): Promise<number> {
    const updateResult = await this.userRepository
      .createQueryBuilder()
      .update()
      .set({ hasProblems: () => `RANDOM() < 0.5` })
      .execute();

    return updateResult.affected ?? 0;
  }
}
