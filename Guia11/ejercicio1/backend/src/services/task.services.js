const { TaskModel } = require("../models/Task");
const TaskRepository = require("../models/repository/TaskRepository");

const mongoose_objectid = require('mongoose/lib/types/objectid');

const _repository = new TaskRepository();

const GetAllTaskByUser = async (user_id) => {
    const tasks = await TaskModel.find({
        user: user_id
    }).sort({ fecha_creacion: 'desc' });

    return tasks
}

const GetTaskById = async (id) => {
    if(!mongoose_objectid.isValid(id)) {
        throw new BadRequestError("El identificador de la tarea es invalido");
    }

    const task = await TaskModel.findById(id).populate('user');

    return task;
}

const FinalizarTask = async (id, user_id) => {

    if(!mongoose_objectid.isValid(id)) {
        throw new BadRequestError("El identificador de la tarea es invalido");
    }

    const finishTask = await _repository.FinalizarTarea(
        id, user_id
    );

    return finishTask;
}

const DeleteTask = async (id, user_id) => {

    if(!mongoose_objectid.isValid(id)) {
        throw new BadRequestError("El identificador de la tarea es invalido");
    }

    const deleteTask = await _repository.DeleteTask(
        id, user_id
    );

    return deleteTask;
}


const CreateNewTask = async (taskData, user_id) => {
    let { titulo, prioridad, detalle } = taskData;

    if(!mongoose_objectid.isValid(user_id)) {
        throw new BadRequestError("Hubo un error obteniendo al usuario");
    }

    const newTask = await _repository.CreateNewTask(
        titulo, prioridad, detalle, user_id
    );

    return newTask;
}

module.exports = {
    GetAllTaskByUser: GetAllTaskByUser,
    GetTaskById: GetTaskById,
    FinalizarTask: FinalizarTask,
    DeleteTask: DeleteTask,
    CreateNewTask: CreateNewTask
}