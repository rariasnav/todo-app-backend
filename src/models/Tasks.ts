import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
    title: string,
    description: string,
    completed: boolean,
    userId: string
}

const TaskSchema: Schema = new Schema (
    {
        title: { type: String, require: true },
        description: { type: String },
        completed: { type: Boolean, default: false },
        userId: { type: String, require: true },
    },
    { timestamps: true }
);

export default mongoose.model<ITask>("Task", TaskSchema);