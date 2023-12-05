import { Schema, model } from "mongoose";

const taskSchema = new Schema({
    description:{
        type: String
    },
    taskId:{
        type: Schema.Types.ObjectId,
        ref:'taskList'
    }
})

const task = model('task' , taskSchema);

export default task;