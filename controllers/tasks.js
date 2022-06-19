const Task = require('../models/Task')
const asyncWrapper = require('../middleware/asyncWrapper')
const {createCustomError} = require('../errors/customError')

const getAllTasks = asyncWrapper(
    async (req, res) => {
        const tasks = await Task.find({})
        res.status(200).json({tasks})
    }
)

const createTask = asyncWrapper(
    async (req, res) => {
        const task = await Task.create(req.body);
        res.status(201).json({task})
    }
)

const getTask = asyncWrapper(
    async (req, res, next) => {
        const taskId = req.params.id;
        const task = await Task.findOne({_id:taskId});
        if (!task) {
            return next(createCustomError(`No tasks found with id = ${taskId}`, 404))
        }
        res.status(200).json({task});
    }
)

const deleteTask = asyncWrapper(
    async (req, res) => {
        const {id: taskId} = req.params;
        const task = await Task.findOneAndDelete({_id: taskId})
        if (!task) return next(createCustomError(`No tasks found with id = ${taskId}`, 404))
        // res.status(200).send(`Deleted task with Id: ${taskId}`)
        res.status(200).json({'status': 'deleted successfully', 'deleted data':task})
    }
)

const updateTask = asyncWrapper(
    async (req, res) => {
        const taskId = req.params.id
        const task = await Task.findOneAndUpdate({_id: taskId}, req.body, {
            new: true,
            runValidators: true,
        })
        if (!task) return next(createCustomError(`No tasks found with id = ${taskId}`, 400))
        res.status(200).json({task})
    }
)

module.exports = {
    getAllTasks, createTask, getTask, updateTask, deleteTask
}