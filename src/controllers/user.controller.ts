import { Request, Response } from 'express';
import { IUser } from '../models/user';
import { UserService } from '../services/user.service';

const userService = new UserService();

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error creating user
 */
export async function postUser(req: Request, res: Response): Promise<void> {
    try {
        const user = req.body as IUser;

        // Verificar si se incluyen ratings en el cuerpo de la solicitud
        if (!user.ratings) {
            user.ratings = []; // Inicializar ratings como un array vacío si no se proporciona
        }

        const newUser = await userService.postUser(user);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: "Error creating user", error });
    }
}

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Error getting users
 */
export async function getAllUsers(req: Request, res: Response): Promise<void> {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const usersPaginated = await userService.getAllUsers(page, limit);
        
        res.status(200).json(usersPaginated);
    } catch (error) {
        res.status(400).json({ message: "Error getting users", error });
    }
}


/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error getting user
 */
export async function getUserById(req: Request, res: Response): Promise<void> {
    try {
        const id = req.params.id;
        const user = await userService.getUserById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: "Error getting user", error });
    }
}

/**
 * @swagger
 * /api/users/name/{name}:
 *   get:
 *     summary: Get a user by name
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The user name
 *     responses:
 *       200:
 *         description: The user description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error getting user
 */
export async function getUserByName(req: Request, res: Response): Promise<void> {
    try {
        const name = req.params.name;
        const user = await userService.getUserByName(name);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: "Error getting user", error });
    }
}
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The updated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error updating user
 */
export async function updateUserById(req: Request, res: Response): Promise<void> {
    try {
        const id = req.params.id;
        const user = req.body as IUser;
        const updatedUser = await userService.updateUserById(id, user);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: "Error updating user", error });
    }
}

export async function deleteUserById(req: Request, res: Response): Promise<void> {
    try {
        const id = req.params.id;
        const deletedUser = await userService.deleteUserById(id);
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(400).json({ message: "Error deleting user", error });   
    }
}

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Deactivate a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The deactivated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error deactivating user
 */
export async function deactivateUserById(req: Request, res: Response): Promise<void> {
    try {
        const id = req.params.id;
        const deactivatedUser = await userService.deactivateUserById(id);
        res.status(200).json(deactivatedUser);
    } catch (error) {
        res.status(400).json({ message: "Error deactivating user", error });
    }
}
/**
 * @swagger
 * /api/users/{id}/packets:
 *   get:
 *     summary: Get all packets of a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: List of packets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Packet'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
export async function getUserPackets(req: Request, res: Response): Promise<void> {
    try {
        const userId = req.params.id;
        const packets = await userService.getUserPacketsById(userId);

        if (!packets) {
            res.status(404).json({ message: "User not found or no packets available" });
            return;
        }

        res.status(200).json(packets);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving packets", error });
    }
}

/**
 * @swagger
 * /api/users/{name}/packets:
 *   post:
 *     summary: Add a packet to a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The user name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               packetId:
 *                 type: string
 *                 description: The ID of the packet to add
 *     responses:
 *       200:
 *         description: Packet added to user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User or packet not found
 *       500:
 *         description: Internal server error
 */
export async function addPacketToUser(req: Request, res: Response): Promise<void> {
    try {
        const userName = req.params.name;
        const { packetId } = req.body;

        if (!packetId) {
            res.status(400).json({ message: "Packet ID is required" });
            return;
        }

        const updatedUser = await userService.addPacketToUser(userName, packetId);

        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error adding packet to user", error });
    }
}

/**
 * @swagger
 * /api/users/{id}/ratings:
 *   get:
 *     summary: Get all ratings of a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: List of ratings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rating'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
export async function getUserRatings(req: Request, res: Response): Promise<void> {
    try {
        const userId = req.params.id;
        const ratings = await userService.getUserRatings(userId);

        if (!ratings) {
            res.status(404).json({ message: "User not found or no ratings available" });
            return;
        }

        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving ratings", error });
    }
}
/**
 * @swagger
 * /api/users/{id}/ratings:
 *   post:
 *     summary: Add a rating to a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ratingId:
 *                 type: string
 *                 description: The ID of the rating to add
 *     responses:
 *       200:
 *         description: Rating added to user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User or rating not found
 *       500:
 *         description: Internal server error
 */
export async function addRatingToUser(req: Request, res: Response): Promise<void> {
    try {
        const userId = req.params.id;
        const { ratingId } = req.body;

        if (!ratingId) {
            res.status(400).json({ message: "Rating ID is required" });
            return;
        }

        const updatedUser = await userService.addRatingToUser(userId, ratingId);

        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error adding rating to user", error });
    }
}

/**
 * @swagger
 * /api/users/{id}/ratings:
 *   delete:
 *     summary: Remove a rating from a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ratingId:
 *                 type: string
 *                 description: The ID of the rating to remove
 *     responses:
 *       200:
 *         description: Rating removed from user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User or rating not found
 *       500:
 *         description: Internal server error
 */
export async function removeRatingFromUser(req: Request, res: Response): Promise<void> {
    try {
        const userId = req.params.id;
        const { ratingId } = req.body;

        if (!ratingId) {
            res.status(400).json({ message: "Rating ID is required" });
            return;
        }

        const updatedUser = await userService.removeRatingFromUser(userId, ratingId);

        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error removing rating from user", error });
    }
}