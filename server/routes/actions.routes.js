import { Router } from "express";
import { addList, addTaskToList, getAllLists, getAllTasks, getTasks, updateListId } from "../controllers/actions.controller.js";

const router = Router();

router.post('/newList' , addList);
router.post('/newTask' , addTaskToList);
router.get('/allList' , getAllLists);
router.get('/:listId' , getTasks);
router.get('/allTasks' , getAllTasks);
router.put('/updateTask/:taskId' , updateListId);

export default router;