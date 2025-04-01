import { IUser, UserModel } from '../models/user';

export class UserService {
    async postUser(user: Partial<IUser>): Promise<IUser> {
        const newUser = new UserModel(user);
        return await newUser.save();
    }

    async getAllUsers(page: number, limit: number): Promise<{ 
        totalUsers: number; 
        totalPages: number; 
        currentPage: number; 
        data: IUser[]; 
    }> {
        const skip = (page - 1) * limit;
    
        const totalUsers = await UserModel.countDocuments({ available: true });
    
        const users = await UserModel.find().skip(skip).limit(limit);
    
        return {
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            currentPage: page,
            data: users,
        };
    }

    async getUserById(id: string): Promise<IUser | null> {
        return await UserModel.findOne({ _id: id, available: true }).populate("ratings");
    }

    async getUserByName(name: string): Promise<IUser | null> {
        return await UserModel.findOne({ name, available: true }).populate("ratings");
    }

    async updateUserById(id: string, user: Partial<IUser>): Promise<IUser | null> {
        return await UserModel.findOneAndUpdate({ _id: id, available: true }, user, { new: true });
    }

    async deleteUserById(id: string): Promise<IUser | null> {
        return await UserModel.findByIdAndDelete(id);
    }

    async deactivateUserById(id: string): Promise<IUser | null> {
        return await UserModel.findByIdAndUpdate(id, { available: false }, { new: true });
    }

    async getUserPacketsById(userId: string): Promise<IUser["packets"] | null> {
        const user = await UserModel.findById(userId).populate("packets");
        return user ? user.packets : null;
    }

    async addPacketToUser(userName: string, packetId: string): Promise<IUser | null> {
        const user = await UserModel.findOne({ name: userName, available: true });
        if (!user) {
            throw new Error("User not found");
        }

        if (!user.packets.includes(packetId as any)) {
            return await UserModel.findByIdAndUpdate(
                user._id,
                { $push: { packets: packetId } },
                { new: true, runValidators: false }
            );
        }

        return user;
    }

    async addRatingToUser(userId: string, ratingId: string): Promise<IUser | null> {
        return await UserModel.findByIdAndUpdate(
            userId,
            { $push: { ratings: ratingId } },
            { new: true }
        ).populate("ratings");
    }

    async removeRatingFromUser(userId: string, ratingId: string): Promise<IUser | null> {
        return await UserModel.findByIdAndUpdate(
            userId,
            { $pull: { ratings: ratingId } },
            { new: true }
        ).populate("ratings");
    }

    async getUserRatings(userId: string): Promise<IUser["ratings"] | null> {
        const user = await UserModel.findById(userId).populate("ratings");
        return user ? user.ratings : null;
    }
}

export default new UserService();