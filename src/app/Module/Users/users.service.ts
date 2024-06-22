import { TUser } from './users.interface';
import { User } from './users.model';

 
const createsignupIntoDB = async (payload: TUser) => {
    const result = User.create(payload)
    return result;
};
export const userService = {
    createsignupIntoDB
}