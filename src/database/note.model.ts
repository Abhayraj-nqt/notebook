import mongoose, { Schema, Document } from "mongoose";

export interface INote extends Document {
  title: string;
  content: string;
  userId: string; // References Better Auth user ID string
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema<INote>(
  {
    title: { type: String, required: true },
    content: { type: String, default: "" },
    userId: { type: String, required: true, index: true }, // Index for fast user queries
  },
  { timestamps: true }
);

export const Note =
  mongoose.models.Note || mongoose.model<INote>("Note", NoteSchema);
