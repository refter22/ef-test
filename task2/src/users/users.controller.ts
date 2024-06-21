import { Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('reset-problems')
  async resetProblems(): Promise<{ count: number }> {
    const count = await this.usersService.resetProblemsFlag();
    return { count };
  }

  @Post('set-random-problems')
  async setRandomProblems(): Promise<{ count: number }> {
    const count = await this.usersService.setRandomProblemsFlag();
    return { count };
  }
}
