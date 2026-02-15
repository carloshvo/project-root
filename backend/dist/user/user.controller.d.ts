import { UsersService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserResponse } from '../shared/types';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(search?: string): Promise<UserResponse[]>;
    findOne(id: string): Promise<UserResponse>;
    create(data: CreateUserDto): Promise<UserResponse>;
    update(id: string, data: UpdateUserDto): Promise<UserResponse>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
