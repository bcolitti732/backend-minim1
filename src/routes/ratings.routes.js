"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ratings_controller_1 = require("../controllers/ratings.controller");
const router = (0, express_1.Router)();
router.post("/", ratings_controller_1.upsertRating);
router.get("/:userId", ratings_controller_1.getRatingByUser);
router.put("/:userId", ratings_controller_1.updateRating);
router.delete("/:userId", ratings_controller_1.deleteRatingByUser);
router.get("/", ratings_controller_1.getPaginatedRatings);
router.get("/search", ratings_controller_1.searchRatings);
exports.default = router;
