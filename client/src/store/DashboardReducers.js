import { createSlice } from "@reduxjs/toolkit";

const DashboardSlice = createSlice({
  name: 'DashboardSlice',
  initialState: {
    allLists: [],
    tasks: [],
  },
  reducers: {
    setLists: (state, action) => {
      state.allLists = action.payload;
    },
    setTasks:(state , action) => {
      state.tasks = [...state.tasks, ...action.payload];
    },
    addNewTask:(state , action) => {
      state.tasks = [...state.tasks, action.payload];
    },
    updateTasks:(state , action) => {
      state.tasks = state.tasks.map((task) => task._id === action.payload._id? action.payload : task);
    }
    
  },
});

export const { setLists , setTasks , clearTask , addNewTask , updateTasks} = DashboardSlice.actions;

export default DashboardSlice.reducer;

export const fetchLists = () => {
  return async (dispatch) => {
    try {
      const data = await fetch(`http://localhost:5056/api/action/allList`);
      const lists = await data.json();
      dispatch(setLists(lists));
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };
};

export const fetchTasks = (listId) => {
  return async (dispatch) => {
    try {
      const data = await fetch(`http://localhost:5056/api/action/${listId}`);
      const tasks = await data.json();
      dispatch(setTasks(tasks));
    } catch (error) {
      console.error("Error fetching Tasks:", error);
    }
  };
};

// export const fetchAllTasks = () => {
//   return async (dispatch) => {
//     try {
//       const data = await fetch(`http://localhost:5056/api/action/allTasks`);
//       const tasks = await data.json();
//       dispatch(setTasks(tasks));
//     } catch (error) {
//       console.error("Error fetching Tasks:", error);
//     }
//   };
// };

export const updateTaskList = (draggedTaskId, destinationListId) => {
  return async(dispatch) => {
    try{
      const updatedTask = await fetch(`http://localhost:5056/api/action/updateTask/${draggedTaskId}`, {
        method: "PUT",
        body: JSON.stringify({
          list: destinationListId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await updatedTask.json();
      dispatch(updateTasks(data.updatedTask));
    }catch(e){
      console.error(e.message);
    }
  }
}



