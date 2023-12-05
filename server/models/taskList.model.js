import { Schema, model } from "mongoose";

const taskListSchema = new Schema({
    taskName:{
        type: String
    },
    taskDescription:{
        type: String
    },
    list:{
        type: Schema.Types.ObjectId,
        ref:'listTable',
        required: true
    }
})

const taskList = model('taskList' , taskListSchema);
export default taskList;