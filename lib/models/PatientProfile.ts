import mongoose, { Document, Model, Schema } from "mongoose";

export interface IPatientProfile extends Document {
  userId?: mongoose.Types.ObjectId; // Optional link to a user account if the patient logs in
  providerId: mongoose.Types.ObjectId; // The doctor managing this patient
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  contactNumber: string;
  medicalHistory: string[];
  activeMedications: string[];
  createdAt: Date;
  updatedAt: Date;
}

const PatientProfileSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: false },
    providerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    contactNumber: { type: String },
    medicalHistory: [{ type: String }],
    activeMedications: [{ type: String }],
  },
  { timestamps: true }
);

export const PatientProfile: Model<IPatientProfile> =
  mongoose.models.PatientProfile ||
  mongoose.model<IPatientProfile>("PatientProfile", PatientProfileSchema);
