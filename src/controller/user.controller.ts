import { Request, Response } from 'express';
import { CreateUserInput } from '../schema/user.schema';
import { createUser } from '../service/user.service';
import sendEmail  from '../utils/mailer';

export async function createUserHandler(req: Request<{}, {}, CreateUserInput>, res: Response) {
    try {
        const user = await createUser(req.body);

        await sendEmail({
            from: 'test@example.com', // change this with the email address you want to use
            to: user.email,
            subject: "Please verify your account",
            text: `Verification code: ${user.verificationCode}. Id: ${user._id}`
        });

        return res.send('User created successfully');
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(409).send('User already exists');
        }

        return res.status(500).send(error);
    }
}