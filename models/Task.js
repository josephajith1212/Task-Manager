const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Invalid task name!'],
        trim: true,
        maxlength: [20, "Task name can't be more than 20 char"],
    }, 
    completed: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Task', taskSchema);