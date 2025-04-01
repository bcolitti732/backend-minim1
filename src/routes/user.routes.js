"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const user_controller_1 = require("../controllers/user.controller");
// Rutas de usuarios
router.get("/", user_controller_1.getAllUsers); // Obtener todos los usuarios (paginados)
router.post("/", user_controller_1.postUser); // Crear un nuevo usuario
router.get('/:id', user_controller_1.getUserById); // Obtener un usuario por ID
router.get('/name/:name', user_controller_1.getUserByName); // Obtener un usuario por nombre
router.put('/:id', user_controller_1.updateUserById); // Actualizar un usuario por ID
router.delete('/:id', user_controller_1.deleteUserById); // Eliminar un usuario por ID
router.put('/:id/deactivate', user_controller_1.deactivateUserById); // Desactivar un usuario por ID
// Rutas relacionadas con paquetes
router.get('/:id/packets', user_controller_1.getUserPackets); // Obtener los paquetes de un usuario
router.post('/:name/packets', user_controller_1.addPacketToUser); // Agregar un paquete a un usuario
// Rutas relacionadas con valoraciones (ratings)
router.post('/:id/ratings', user_controller_1.addRatingToUser); // Agregar una valoración a un usuario
router.delete('/:id/ratings', user_controller_1.removeRatingFromUser); // Eliminar una valoración de un usuario
router.get('/:id/ratings', user_controller_1.getUserRatings); // Obtener todas las valoraciones de un usuario
exports.default = router;
