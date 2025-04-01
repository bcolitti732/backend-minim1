"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingModel = void 0;
const mongoose_1 = require("mongoose");
const ratingSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: false }, //opcional per simplificarme la vida
    createdAt: { type: Date, default: Date.now },
});
exports.RatingModel = (0, mongoose_1.model)("Rating", ratingSchema);
