import { Controller, Get, Query } from '@nestjs/common';
import { UserChangesService } from './user-changes.service';

@Controller('user-changes')
export class UserChangesController {
  constructor(private readonly userChangesService: UserChangesService) {}

  @Get()
  async getUserChanges(
    @Query('userId') userId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.userChangesService.getUserChanges(userId, page, limit);
  }
}
