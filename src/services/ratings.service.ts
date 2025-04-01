import { RatingModel } from "../models/ratings";
import { ObjectId } from "mongoose";

export class RatingService {
    async upsertRating(user: ObjectId, score: number, comment?: string) {
        const existingRating = await RatingModel.findOne({ user });

        if (existingRating) {
            return await RatingModel.findOneAndUpdate(
                { user },
                { score, comment },
                { new: true }
            );
        } else {
            const rating = new RatingModel({ user, score, comment });
            return await rating.save();
        }
    }

    async getRatingByUser(userId: string) {
        return await RatingModel.findOne({ user: userId });
    }

    async deleteRatingByUser(userId: string) {
        return await RatingModel.findOneAndDelete({ user: userId });
    }

    async updateRating(ratingId: string, score: number, comment?: string) {
        return await RatingModel.findByIdAndUpdate(
            ratingId,
            { score, comment },
            { new: true }
        );
    }

    async getPaginatedRatings(page: number, limit: number) {
        const skip = (page - 1) * limit;
        const totalRatings = await RatingModel.countDocuments();

        const ratings = await RatingModel.find()
            .skip(skip)
            .limit(limit);

        return {
            totalRatings,
            totalPages: Math.ceil(totalRatings / limit),
            currentPage: page,
            data: ratings,
        };
    }

    async searchRatings(score: number) {
        return await RatingModel.find({ score });
    }
}

export default new RatingService();