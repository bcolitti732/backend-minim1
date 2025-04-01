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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertRating = upsertRating;
exports.getRatingByUser = getRatingByUser;
exports.deleteRatingByUser = deleteRatingByUser;
exports.updateRating = updateRating;
exports.getPaginatedRatings = getPaginatedRatings;
exports.searchRatings = searchRatings;
const ratings_service_1 = __importDefault(require("../services/ratings.service"));
/**
 * @swagger
 * /api/ratings:
 *   post:
 *     summary: Create or update a rating for a user
 *     tags: [Ratings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: The ID of the user being rated
 *               score:
 *                 type: number
 *                 description: The rating score (1-5)
 *               comment:
 *                 type: string
 *                 description: Optional comment
 *     responses:
 *       200:
 *         description: The rating was successfully created or updated
 *       400:
 *         description: Error creating or updating rating
 */
function upsertRating(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user, score, comment } = req.body;
            const rating = yield ratings_service_1.default.upsertRating(user, score, comment);
            res.status(200).json(rating);
        }
        catch (error) {
            res.status(400).json({ message: "Error creating or updating rating", error });
        }
    });
}
/**
 * @swagger
 * /api/ratings/{userId}:
 *   get:
 *     summary: Get the rating of a user
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: The user's rating
 *       400:
 *         description: Error fetching rating
 */
function getRatingByUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.params.userId;
            const rating = yield ratings_service_1.default.getRatingByUser(userId);
            res.status(200).json(rating);
        }
        catch (error) {
            res.status(400).json({ message: "Error fetching rating", error });
        }
    });
}
/**
 * @swagger
 * /api/ratings/{userId}:
 *   delete:
 *     summary: Delete the rating of a user
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: The user's rating was deleted
 *       400:
 *         description: Error deleting rating
 */
function deleteRatingByUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.params.userId;
            const deletedRating = yield ratings_service_1.default.deleteRatingByUser(userId);
            res.status(200).json(deletedRating);
        }
        catch (error) {
            res.status(400).json({ message: "Error deleting rating", error });
        }
    });
}
/**
 * @swagger
 * /api/ratings/{id}:
 *   put:
 *     summary: Update a rating
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the rating
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: number
 *                 description: The updated rating score (1-5)
 *               comment:
 *                 type: string
 *                 description: The updated comment
 *     responses:
 *       200:
 *         description: The updated rating
 *       400:
 *         description: Error updating rating
 */
function updateRating(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const { score, comment } = req.body;
            const updatedRating = yield ratings_service_1.default.updateRating(id, score, comment);
            res.status(200).json(updatedRating);
        }
        catch (error) {
            res.status(400).json({ message: "Error updating rating", error });
        }
    });
}
/**
 * @swagger
 * /api/ratings:
 *   get:
 *     summary: Get paginated ratings
 *     tags: [Ratings]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: The page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: The number of ratings per page
 *     responses:
 *       200:
 *         description: Paginated list of ratings
 *       400:
 *         description: Error fetching ratings
 */
function getPaginatedRatings(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const paginatedRatings = yield ratings_service_1.default.getPaginatedRatings(page, limit);
            res.status(200).json(paginatedRatings);
        }
        catch (error) {
            res.status(400).json({ message: "Error fetching paginated ratings", error });
        }
    });
}
/**
 * @swagger
 * /api/ratings/search:
 *   get:
 *     summary: Search ratings by score
 *     tags: [Ratings]
 *     parameters:
 *       - in: query
 *         name: score
 *         schema:
 *           type: number
 *         description: The score to filter ratings by
 *     responses:
 *       200:
 *         description: List of users with the specified score
 *       400:
 *         description: Error searching ratings
 */
function searchRatings(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const score = parseInt(req.query.score);
            if (isNaN(score)) {
                res.status(400).json({ message: "Invalid score parameter" });
                return;
            }
            const ratings = yield ratings_service_1.default.searchRatings(score);
            res.status(200).json(ratings);
        }
        catch (error) {
            res.status(400).json({ message: "Error searching ratings", error });
        }
    });
}
