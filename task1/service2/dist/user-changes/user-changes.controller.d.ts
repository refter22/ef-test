import { UserChangesService } from './user-changes.service';
export declare class UserChangesController {
    private readonly userChangesService;
    constructor(userChangesService: UserChangesService);
    getUserChanges(userId: number, page?: number, limit?: number): Promise<{
        data: import("./user-changes.entity").UserChanges[];
        total: number;
        page: number;
        lastPage: number;
    }>;
}
