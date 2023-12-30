import { Severity, getModelForClass, modelOptions, pre, prop, DocumentType } from "@typegoose/typegoose";
import { nanoid } from "nanoid";
import argon2d from "argon2";
import log from "../utils/logger";

// hashes the password before saving it to the database
@pre<User>("save", async function () {
    if (this.isModified("password")) {
        this.password = await argon2d.hash(this.password);
    }

    return;
})
@modelOptions(
    {
        schemaOptions: {
            timestamps: true
        },
        options: {
            allowMixed: Severity.ALLOW
        }
    }
)
export class User {
    @prop({lowercase: true, required: true, unique: true})
    email: string;

    @prop({required: true})
    firstName: string;

    @prop({required: true})
    lastName: string;

    @prop({required: true})
    password: string;

    @prop({required: true, default: () => nanoid()})
    verificationCode: string;

    @prop()
    passwordResetCode: string | null; // null means to not allow password reset with an old code

    @prop({default: false})
    verified: boolean;

    async validatePassword(this: DocumentType<User>, candidatePassword: string) {
        try {
            return await argon2d.verify(this.password, candidatePassword);
        }
        catch (error) {
            log.error(error, "Error while validating password");
            return false;
        }
    }
}

const UserModel = getModelForClass(User);

export default UserModel;