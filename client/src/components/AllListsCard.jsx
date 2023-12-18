import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTask, fetchTasks } from "../store/DashboardReducers.js";
import TaskCard from "./TaskCard.jsx";
import { Droppable , Draggable } from "react-beautiful-dnd";


const ListCard = ({ list }) => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchTasks(list._id));
  }, []);

  const { tasks } = useSelector((state) => state.Dashboard);
  const filteredTasks = tasks.filter((task) => task.list === list._id);


  const [showNewTask, setShowNewTask] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleNewTask = () => {
    setShowNewTask(true);
  };

  const handleAddTask = async (e, listId) => {
    e.preventDefault();
    try {
      
      const response = await fetch("http://localhost:5056/api/action/newTask", {
        method: "POST",
        body: JSON.stringify({
          taskName,
          taskDescription,
          list: listId
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);      // setTimeout(() => {
      //   dispatch(fetchTasks(listId))
      // } , 500)
      dispatch(addNewTask(data.newTask));
      setShowNewTask(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <Droppable droppableId={list._id}>
        {(provided) => 
        (
          <div {...provided.droppableProps} ref={provided.innerRef}
          className="listCardWrapper">
            <div className="listHead">{list.listName}</div>
            {filteredTasks.map((taskItem , index) => (
              <Draggable draggableId={taskItem._id} 
                         key={taskItem._id} 
                         index={index} 
                         >
                {(provided) => 
                (
                  <div {...provided.draggableProps} 
                       {...provided.dragHandleProps} 
                       ref={provided.innerRef}>                  
                       <TaskCard key={taskItem._id} taskItem={taskItem} />
                  </div>
                )
                }
              </Draggable>
            ))}
            <button className="newTask" onClick={handleNewTask}>
              + New Task
            </button>
            <div className={`newTaskPopUp ${showNewTask ? "visible" : ""}`}>
                  <div className="newTaskName">
                    <p>Name of Task : </p>
                    <input
                      type="text"
                      placeholder="Enter task Name"
                      value={taskName}
                      onChange={(e) => setTaskName(e.target.value)}
                    />
                  </div>
              <div className="newTaskDesc">
                <p>Task description : </p>
                <textarea
                  type="textArea"
                  placeholder="Enter task Description"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
              </div>
              <div className="submitNewTask">
                <button onClick={(e) => handleAddTask(e , list._id)}>
                  Add Task
                </button>
                <button className="close" onClick={() => {setShowNewTask(false)}}>close</button>

              </div>
           </div>
      </div>
        )
        }
      </Droppable>
    </>
  );
};

export default ListCard;


