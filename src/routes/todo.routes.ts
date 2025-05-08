import express from 'express';
import { authenticate } from '../middleware/auth.middleware';
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from '../controllers/todo.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

router.use(asyncHandler(authenticate));
router.post('/', createTodo);
router.get('/', getTodos);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;