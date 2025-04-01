import { Router } from "express";
import {
    upsertRating,
    getRatingByUser,
    deleteRatingByUser,
    updateRating,
    getPaginatedRatings,
    searchRatings,
} from "../controllers/ratings.controller";

const router = Router();

router.post("/", upsertRating);

router.get("/:userId", getRatingByUser);

router.put("/:userId", updateRating);

router.delete("/:userId", deleteRatingByUser);

router.get("/", getPaginatedRatings);

router.get("/search", searchRatings);

export default router;