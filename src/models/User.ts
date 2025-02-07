import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IUser extends Document {
    _id: string | ObjectId;
    name: string,
    email: string,
    password: string
}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, require: true },
        email: { type: String, require: true, unique: true },
        password: { type: String, require: true },
    },
    { timestamps: true },
)

export default mongoose.model<IUser>("User", UserSchema)