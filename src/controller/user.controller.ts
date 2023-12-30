import { Request, Response } from 'express';
import { CreateUserInput } from '../schema/user.schema';
import { createUser } from '../service/user.service';

export async function createUserHandler(req: Request<{}, {}, CreateUserInput>, res: Response) {
    try {
        const user = await createUser(req.body);
        return res.send('User created successfully');
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(409).send('User already exists');
        }

        return res.status(500).send(error);
    }
}