const { GetAllTaskByUser, GetTaskById, FinalizarTask, CreateNewTask, DeleteTask } = require("../services/task.services");
const { validateTokenSignature } = require("../utils/Auth");

const getAllTaskByUser = async (req, res) => {

    const payload = await validateTokenSignature(req)
    const datos = await GetAllTaskByUser(payload.id);

    res.status(200).json({
        datos: datos,
        estado: true
    });
}

const getTaskById = async (req, res) => {
    const { id } = req.params;
    const datos = await GetTaskById(id);

    res.status(200).json({
        datos: datos,
        estado: true
    })
}

const finalizarTask = async (req, res) => {
    const { id } = req.params;

    const payload = await validateTokenSignature(req)
    const datos = await FinalizarTask(id, payload.id)

    res.status(200).json({
        datos: datos,
        estado: true
    })
}

const deleteTask = async (req, res) => {
    const { id } = req.params;

    const payload = await validateTokenSignature(req)
    const datos = await DeleteTask(id, payload.id)

    res.status(200).json({
        datos: datos,
        estado: true
    })
}

const createNewTask = async (req, res) => {
    const taskReqData = req.body;
    const payload = await validateTokenSignature(req)

    const newTask = await CreateNewTask(taskReqData, payload.id);

    console.log(newTask)

    res.status(201).json({
        mensaje: "Nueva tarea agregada",
        datos: newTask,
        estado: true
    })
}

module.exports = {
    getAllTaskByUser,
    getTaskById,
    finalizarTask,
    createNewTask,
    deleteTask
}