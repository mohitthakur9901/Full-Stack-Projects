import mongoose, { Schema, Document } from "mongoose";
import mongooseAggregate from 'mongoose-aggregate-paginate-v2'
enum IssueStatus {
    OPEN = "open",
    CLOSED = "closed",
    IN_PROGRESS = "in_progress"
}

interface IssueProps extends Document {
    title: string;
    description: string;
    status: IssueStatus;
    reporter: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const IssueSchema = new Schema<IssueProps>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: Object.values(IssueStatus), default: IssueStatus.OPEN },
    reporter: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
},{timestamps:true});
IssueSchema.plugin(mongooseAggregate);

export const Issue = mongoose.model<IssueProps>('Issue', IssueSchema);
