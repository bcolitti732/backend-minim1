import { Request, Response } from "express";
import RatingService from "../services/ratings.service";

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
export async function upsertRating(req: Request, res: Response): Promise<void> {
    try {
        const { user, score, comment } = req.body;
        const rating = await RatingService.upsertRating(user, score, comment);
        res.status(200).json(rating);
    } catch (error) {
        res.status(400).json({ message: "Error creating or updating rating", error });
    }
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
export async function getRatingByUser(req: Request, res: Response): Promise<void> {
    try {
        const userId = req.params.userId;
        const rating = await RatingService.getRatingByUser(userId);
        res.status(200).json(rating);
    } catch (error) {
        res.status(400).json({ message: "Error fetching rating", error });
    }
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
export async function deleteRatingByUser(req: Request, res: Response): Promise<void> {
    try {
        const userId = req.params.userId;
        const deletedRating = await RatingService.deleteRatingByUser(userId);
        res.status(200).json(deletedRating);
    } catch (error) {
        res.status(400).json({ message: "Error deleting rating", error });
    }
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
export async function updateRating(req: Request, res: Response): Promise<void> {
    try {
        const id = req.params.id;
        const { score, comment } = req.body;
        const updatedRating = await RatingService.updateRating(id, score, comment);
        res.status(200).json(updatedRating);
    } catch (error) {
        res.status(400).json({ message: "Error updating rating", error });
    }
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
export async function getPaginatedRatings(req: Request, res: Response): Promise<void> {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const paginatedRatings = await RatingService.getPaginatedRatings(page, limit);
        res.status(200).json(paginatedRatings);
    } catch (error) {
        res.status(400).json({ message: "Error fetching paginated ratings", error });
    }
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
export async function searchRatings(req: Request, res: Response): Promise<void> {
    try {
        const score = parseInt(req.query.score as string);
        if (isNaN(score)) {
            res.status(400).json({ message: "Invalid score parameter" });
            return;
        }

        const ratings = await RatingService.searchRatings(score);
        res.status(200).json(ratings);
    } catch (error) {
        res.status(400).json({ message: "Error searching ratings", error });
    }
}