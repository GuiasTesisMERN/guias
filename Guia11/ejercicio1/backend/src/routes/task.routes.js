// ./scr/routes/user.routes.js
const { Router } = require('express');
const { getAllTaskByUser, getTaskById, createNewTask, finalizarTask, deleteTask } = require('../controllers/task.controller');
const { usuarioAutenticado } = require('../middlewares/auth.middleware');
const { validarCreateNewTask } = require('../middlewares/task.middleware');

const TaskRoute = Router();

/**
 * Higher order function para manejar las excepciones lanzadas en las 
 * demas funciones debe de ir en la rutas
 * @param function fn(req, res, next)
 * @returns
 */
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

TaskRoute.get('/',
    asyncHandler(usuarioAutenticado),
    asyncHandler(getAllTaskByUser)
);

TaskRoute.get('/:id',
    asyncHandler(usuarioAutenticado),
    asyncHandler(getTaskById)
);

TaskRoute.put('/finalizar/:id',
    asyncHandler(usuarioAutenticado),
    asyncHandler(finalizarTask)
);

TaskRoute.delete('/eliminar/:id',
    asyncHandler(usuarioAutenticado),
    asyncHandler(deleteTask)
);

TaskRoute.post('/', 
    asyncHandler(usuarioAutenticado), 
    asyncHandler(validarCreateNewTask),
    asyncHandler(createNewTask)
);

module.exports = {
    TaskRoute
}