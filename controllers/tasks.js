const getAllTasks = (req, res) => {
    res.send(`All Tasks`);
}

const createTask = (req, res) => {
    res.json(req.body)
}

const getTask = (req, res) => {
    res.json(req.params)
    // res.json({id : req.params.id})
    // res.send(`get single task`)
}

const updateTask = (req, res) => {
    res.send(`update task`)
}

const deleteTask = (req, res) => {
    res.send(`delete task`)
}

module.exports = {
    getAllTasks, createTask, getTask, updateTask, deleteTask
}