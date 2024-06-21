import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { UserChangesService } from './user-changes.service';

@Controller('user-changes')
export class UserChangesController {
  constructor(private readonly userChangesService: UserChangesService) {}

  @Get()
  async getUserChanges(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('userId', new ParseIntPipe({ optional: true })) userId?: number,
  ) {
    return this.userChangesService.getUserChanges(userId, page, limit);
  }
}
