import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { userService } from '../services/user.service';

export const userController = {
  list: catchAsync(async (_req: Request, res: Response) => {
    res.json({ success: true, data: userService.list() });
  }),

  getById: catchAsync(async (req: Request, res: Response) => {
    const user = userService.getById(req.params.id);
    res.json({ success: true, data: user });
  }),

  create: catchAsync(async (req: Request, res: Response) => {
    const user = userService.create(req.body);
    res.status(201).json({ success: true, data: user });
  }),

  update: catchAsync(async (req: Request, res: Response) => {
    const user = userService.update(req.params.id, req.body);
    res.json({ success: true, data: user });
  }),

  remove: catchAsync(async (req: Request, res: Response) => {
    userService.remove(req.params.id);
    res.status(204).send();
  }),
};