import { Schema, model } from "mongoose";

const listTableSchema = new Schema({
    listName:{
        type: String
    }
})

const listTable = model('listTable' , listTableSchema);
export default listTable;