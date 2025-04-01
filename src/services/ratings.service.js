"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingService = void 0;
const ratings_1 = require("../models/ratings");
class RatingService {
    upsertRating(user, score, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingRating = yield ratings_1.RatingModel.findOne({ user });
            if (existingRating) {
                return yield ratings_1.RatingModel.findOneAndUpdate({ user }, { score, comment }, { new: true });
            }
            else {
                const rating = new ratings_1.RatingModel({ user, score, comment });
                return yield rating.save();
            }
        });
    }
    getRatingByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ratings_1.RatingModel.findOne({ user: userId });
        });
    }
    deleteRatingByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ratings_1.RatingModel.findOneAndDelete({ user: userId });
        });
    }
    updateRating(ratingId, score, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ratings_1.RatingModel.findByIdAndUpdate(ratingId, { score, comment }, { new: true });
        });
    }
    getPaginatedRatings(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const totalRatings = yield ratings_1.RatingModel.countDocuments();
            const ratings = yield ratings_1.RatingModel.find()
                .skip(skip)
                .limit(limit);
            return {
                totalRatings,
                totalPages: Math.ceil(totalRatings / limit),
                currentPage: page,
                data: ratings,
            };
        });
    }
    searchRatings(score) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ratings_1.RatingModel.find({ score });
        });
    }
}
exports.RatingService = RatingService;
exports.default = new RatingService();
