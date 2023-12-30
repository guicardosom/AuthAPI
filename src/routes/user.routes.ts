import express, { Request, Response } from 'express';
import validateResource from '../middleware/validateResource';
import { createUserSchema } from '../schema/user.schema';
import { createUserHandler } from '../controller/user.controller';

const router = express.Router();

router.post(
    "/api/users", 
    validateResource(createUserSchema), 
    createUserHandler, 
    (req: Request, res: Response) => res.sendStatus(200));

export default router;