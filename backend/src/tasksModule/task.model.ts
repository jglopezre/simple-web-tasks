import mongoose, { Schema } from "mongoose";
import { ITaskDocument } from "@/types";

const TaskSchema: Schema = new Schema({
    title: { type: String, required: true},
    description: { type: String },
    completed: { type: Boolean, default: false },
    creationDate: { type: Date, default: Date.now }
});

const TaskModel = mongoose.model<ITaskDocument>('task', TaskSchema);

export default TaskModel;
