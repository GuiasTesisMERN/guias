const { TaskModel } = require('../Task');

class TaskRepository {
    async CreateNewTask(titulo, prioridad, detalle, user_id) {
        const task = new TaskModel({
            titulo,
            prioridad,
            detalle,
            user: user_id
        });

        const taskResult = await task.save();

        return taskResult;
    }

    async DeleteTask(id, user_id) {
        const task = await TaskModel.findOneAndDelete({user: user_id, _id: id});
        
        //const taskResult = await task.save();

        return task;
    }

    async FinalizarTarea(id, user_id) {

        const task = await TaskModel.findOneAndUpdate({ user: user_id, _id: id }, {
            $set: { finalizado: true }
        }, {returnDocument: 'after'}).populate('user');

        const taskResult = await task.save();

        return taskResult;
    }
}

module.exports = TaskRepository