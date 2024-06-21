import { Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('reset-problems')
  @ApiOperation({ summary: 'Сбросить флаг hasProblems у всех пользователей' })
  @ApiResponse({
    status: 200,
    description: 'Количество обновлений',
    schema: { example: { count: 42 } },
  })
  async resetProblems(): Promise<{ count: number }> {
    const count = await this.usersService.resetProblemsFlag();
    return { count };
  }

  @Post('set-random-problems')
  @ApiOperation({
    summary:
      'Установить флаг hasProblems в случайные значения для всех пользователей',
  })
  @ApiResponse({
    status: 200,
    description: 'Количество обновлений',
    schema: { example: { count: 42 } },
  })
  async setRandomProblems(): Promise<{ count: number }> {
    const count = await this.usersService.setRandomProblemsFlag();
    return { count };
  }
}
