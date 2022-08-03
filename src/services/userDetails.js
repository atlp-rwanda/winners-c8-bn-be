import { User } from '../database/models';

export const getUser = async ({userId}) =>{
    const user = await User.findOne({ where: { id: userId } });
    return user;
}
