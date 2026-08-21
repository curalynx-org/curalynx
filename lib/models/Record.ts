import mongoose, { Document, Model, Schema } from "mongoose";

export interface IRecord extends Document {
  patientId: mongoose.Types.ObjectId;
  providerId: mongoose.Types.ObjectId;
  appointmentId?: mongoose.Types.ObjectId;
  type: "soap_note" | "prescription" | "lab_result";
  title: string;
  content: string; // Can store JSON stringified data (like structured SOAP) or plain text
  date: Date;
  createdAt: Date;
}

const RecordSchema: Schema = new Schema(
  {
    patientId: { type: Schema.Types.ObjectId, ref: "PatientProfile", required: true },
    providerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    appointmentId: { type: Schema.Types.ObjectId, ref: "Appointment" },
    type: {
      type: String,
      enum: ["soap_note", "prescription", "lab_result"],
      required: true,
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Record: Model<IRecord> =
  mongoose.models.Record || mongoose.model<IRecord>("Record", RecordSchema);
