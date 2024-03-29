import mongoose, { Document, Schema } from "mongoose";

enum Status {
    OPEN = "open",
    CLOSED = "closed",
    IN_PROGRESS = "in_progress"
}

interface Task extends Document {
    title: string;
    description: string;
    status: Status;
    assignedTo: Schema.Types.ObjectId
};

const TaskSchema = new mongoose.Schema<Task>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(Status),
        default: Status.OPEN,
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

export const task = mongoose.model<Task>('Task', TaskSchema)