import listTable from "../models/listTable.model.js";
import taskList from "../models/taskList.model.js";

export const addList = async(req , res) => {
  try{
    const listName = req.body;
    await listTable.create(listName);
    res.status(200).send({status: true , message:'new list added!'});
  }catch(error){
    res.status(500).send({status: false , message: error.message});
  }
};

export const addTaskToList = async(req , res) => {
  try{
 const task = req.body;
 const newTask = await taskList.create(task);
 console.log(newTask);
 res.status(200).send({status: true , newTask , message:`new task added to list ${task.list}`});

  }catch(error){
    res.status(500).send({status: true , message: error.message});
  }
}

export const getAllLists = async(req , res) => {
 const data = await listTable.find();
 res.status(200).send(data);
}

export const getTasks = async(req , res) => {
  const data = await taskList.find({list:req.params.listId});
  res.status(200).send(data);
}

export const getAllTasks = async () => {
  try {
    const allTasks = await taskList.find();
    return allTasks;
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    throw error;
  }
};

export const updateListId = async(req , res) => {
try{
  const taskId = req.params.taskId;
  const newListId = req.body.list;
  const updatedTask = await taskList.findByIdAndUpdate(
    taskId,
    { list: newListId },
    { new: true }
  );
  res.status(200).send({
    status: true,
    message: `Task ${taskId} updated with new list ID: ${newListId}`,
    updatedTask,
  });
}catch(e){
  res.status(500).send(console.log(e.message));
}
}

