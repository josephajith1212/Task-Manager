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

const updateTask = (req, res) => {
    res.send(`update task`)
}

const deleteTask = async (req, res) => {
    try{
        const {id: taskId} = req.params;
        const task = await Task.findOneAndDelete({_id: taskId})
        if (!task) return res.status(404).json({msg: `No tasks found with id = ${taskId}`})
        res.send(`Deleted task with Id: ${taskId}`)
    }
    catch(err){
        res.status(500).send({msg: err})
    }
}

module.exports = {
    getAllTasks, createTask, getTask, updateTask, deleteTask
}