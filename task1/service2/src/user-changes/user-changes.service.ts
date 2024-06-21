import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserChanges } from './user-changes.entity';

@Injectable()
export class UserChangesService {
  constructor(
    @InjectRepository(UserChanges)
    private userChangesRepository: Repository<UserChanges>,
  ) {}

  async createUserChange(userChange: UserChanges) {
    return await this.userChangesRepository.save(userChange);
  }

  async getUserChanges(userId: number, page: number = 1, limit: number = 10) {
    const [results, total] = await this.userChangesRepository.findAndCount({
      where: { userId },
      order: { timestamp: 'DESC' },
      take: limit,
      skip: (page - 1) * limit,
    });
    return {
      data: results,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }
}
