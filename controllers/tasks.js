const Task = require('../models/Task')

const getAllTasks = async (req, res) => {
    try{
        const tasks = await Task.find({})
        res.status(200).json({tasks})
    }
    catch(err){
        res.status(500).json({msg: err.message})
    }
}

const createTask = async (req, res) => {
    try{
        const task = await Task.create(req.body);
        res.status(201).json({task})
    }
    catch(err){
        res.status(500).json({msg: err.message})
    }
}

const getTask = async (req, res) => {
    try{
        const taskId = req.params.id;
        const task = await Task.findOne({_id:taskId});
        if (!task) return (res.status(404).json({msg: `No tasks found with id = ${taskId}`}))
        res.status(200).json({task});
    }
    catch(err){
        res.status(500).json({msg:err})
    }
    res.json(req.params)
    // res.json({id : req.params.id})
    // res.send(`get single task`)
}

const deleteTask = async (req, res) => {
    try{
        const {id: taskId} = req.params;
        const task = await Task.findOneAndDelete({_id: taskId})
        if (!task) return res.status(404).json({msg: `No tasks found with id = ${taskId}`})
        // res.status(200).send(`Deleted task with Id: ${taskId}`)
        res.status(200).json({'status': 'deleted successfully', 'deleted data':task})
    }
    catch(err){
        res.status(500).send({msg: err})
    }
}

const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id
        const originalTask = await Task.findOne({_id: taskId})
        const task = await Task.findOneAndUpdate({_id: taskId}, req.body, {
            new: true,
            runValidators: true,
        })
        res.json({taskId, 'old data': originalTask, 'modified data': task})
    } catch (error) {
        
    }
}

module.exports = {
    getAllTasks, createTask, getTask, updateTask, deleteTask
}