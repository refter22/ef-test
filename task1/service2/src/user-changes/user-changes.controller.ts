import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { UserChangesService } from './user-changes.service';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('user-changes')
export class UserChangesController {
  constructor(private readonly userChangesService: UserChangesService) {}

  @Get()
  @ApiOperation({
    summary: 'Получение истории изменений пользователей',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Номер страницы (опционально)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Количество элементов на странице (опционально)',
    example: 10,
  })
  @ApiQuery({
    name: 'userId',
    required: false,
    type: Number,
    description: 'ID пользователя (опционально)',
    example: 1,
  })
  async getUserChanges(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
    @Query('userId', new ParseIntPipe({ optional: true })) userId?: number,
  ) {
    return this.userChangesService.getUserChanges(userId, page, limit);
  }
}
