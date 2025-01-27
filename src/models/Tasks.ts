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
        userId: { type: Schema.Types.ObjectId, ref: "User", require: true, index: true },
    },
    { timestamps: true }
);

export default mongoose.model<ITask>("Task", TaskSchema);