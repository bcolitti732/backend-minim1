import { Router } from 'express';

const router = Router();

import { 
    postUser, 
    getAllUsers, 
    getUserById, 
    deleteUserById, 
    updateUserById, 
    deactivateUserById, 
    getUserPackets, 
    addPacketToUser, 
    getUserByName,
    addRatingToUser,
    removeRatingFromUser,
    getUserRatings
} from '../controllers/user.controller';

// Rutas de usuarios
router.get("/", getAllUsers); // Obtener todos los usuarios (paginados)
router.post("/", postUser); // Crear un nuevo usuario
router.get('/:id', getUserById); // Obtener un usuario por ID
router.get('/name/:name', getUserByName); // Obtener un usuario por nombre
router.put('/:id', updateUserById); // Actualizar un usuario por ID
router.delete('/:id', deleteUserById); // Eliminar un usuario por ID
router.put('/:id/deactivate', deactivateUserById); // Desactivar un usuario por ID

// Rutas relacionadas con paquetes
router.get('/:id/packets', getUserPackets); // Obtener los paquetes de un usuario
router.post('/:name/packets', addPacketToUser); // Agregar un paquete a un usuario

// Rutas relacionadas con valoraciones (ratings)
router.post('/:id/ratings', addRatingToUser); // Agregar una valoración a un usuario
router.delete('/:id/ratings', removeRatingFromUser); // Eliminar una valoración de un usuario
router.get('/:id/ratings', getUserRatings); // Obtener todas las valoraciones de un usuario

export default router;