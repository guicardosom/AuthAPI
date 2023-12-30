import {Request, Response, NextFunction} from 'express';
import { AnyZodObject } from 'zod';

// validates the request against the schema
const validateResource = (schema: AnyZodObject) => 
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            return next();
        } catch (error: any) {
            return res.status(400).send(error.errors);
        }
}

export default validateResource;