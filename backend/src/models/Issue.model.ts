import mongoose, {Schema, Document} from "mongoose";



enum IssueStatus {
    OPEN = "open",
    CLOSED = "closed",
    IN_PROGRESS = "in_progress"
}

interface IssueProps extends Document {
    title: string;
    description: string;
    status: IssueStatus;
    assignee: string;
    reporter: string;
    createdAt: Date;
    updatedAt: Date;
};


const IssueSchema = new Schema<IssueProps>({

    title: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, enum: Object.values(IssueStatus), default: IssueStatus.OPEN},
    assignee: {type: String, required: true},
    reporter: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

export const Issue = mongoose.model('Issue', IssueSchema);