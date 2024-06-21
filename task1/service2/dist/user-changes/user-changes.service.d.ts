import { Repository } from 'typeorm';
import { UserChanges } from './user-changes.entity';
export declare class UserChangesService {
    private userChangesRepository;
    constructor(userChangesRepository: Repository<UserChanges>);
    createUserChange(userChange: UserChanges): Promise<UserChanges>;
    getUserChanges(userId: number, page?: number, limit?: number): Promise<{
        data: UserChanges[];
        total: number;
        page: number;
        lastPage: number;
    }>;
}
