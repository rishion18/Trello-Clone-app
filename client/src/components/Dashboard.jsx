import { useEffect, useState } from 'react';
import '../App.css';
import ListCard from './AllListsCard.jsx';
import { fetchLists, updateTaskList } from '../store/DashboardReducers.js';
import {useDispatch , useSelector} from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';


const Dashboard = () => {


const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLists());
    } , []);


    const { allLists } = useSelector((state) => state.Dashboard);

    const[listName , setListName] = useState('');
    const[listPopUp , setListPopUp] = useState(false);

    const handleNewList = () => {
        setListPopUp(true);
    }

    const addNewList = async(e) => {
        e.preventDefault();
        try {
          await fetch("http://localhost:5056/api/action/newList", {
            method: "POST",
            body: JSON.stringify({
               listName
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          dispatch(fetchLists());
          setListPopUp(false);
        } catch (e) {
          console.log(e.message);
        }
    }

    const handleDragEnd = (result) => {
        if (!result.destination) {
            return;
          }
        
          const sourceListId = result.source.droppableId;
          const destinationListId = result.destination.droppableId;

          if (sourceListId !== destinationListId) {
            const draggedTaskId = result.draggableId;
      
            dispatch(updateTaskList(draggedTaskId, destinationListId));
            
         }
    }

return(
    <>
        <div className="header">
            <div className='left-sec'>
                <div className='logo'><h3 className='logoTag'>Trello clone</h3></div>
                <button className='addList' onClick={(e) => {handleNewList(e)}}>add new list</button>
            </div>
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>

                <div className='board'>
                    {
                        allLists?.map((item) => (<ListCard key={item._id} list={item}/>))
                    }
                    <div className={`newListPopUp ${listPopUp? 'visible':''}`}>
                        <div className='newList'>
                            <p>New List :</p>
                            <input placeholder='New List Name' type='text' onChange={(e) => {setListName(e.target.value)}}></input>
                            <button onClick={(e) => {addNewList(e)}}>Add New List</button>
                        </div>
                    </div>   
                </div>
               
        </DragDropContext>
    </>
)
}

export default Dashboard;