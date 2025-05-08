import { Request, Response } from 'express';
import { Todo } from '../models/todo.model';

export const createTodo = async (req: Request, res: Response) => {
  const { title, description, dueDate, status } = req.body;
  const userId = (req as any).userId;
  const todo = new Todo({ title, description, dueDate, status, owner: userId });
  await todo.save();
  res.status(201).json(todo);
};

export const getTodos = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const todos = await Todo.find({ owner: userId });
  res.json(todos);
};

export const updateTodo = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, owner: userId },
    req.body,
    { new: true }
  );
  res.json(todo);
};

export const deleteTodo = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  await Todo.findOneAndDelete({ _id: req.params.id, owner: userId });
  res.status(204).send();
};