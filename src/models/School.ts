import mongoose, { Schema } from "mongoose";

const schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 1, max: 100 },
    gender: { type: String, require: true, enum: ["male", "female"] },
  },
  { timestamps: true },
);

export const School =
  mongoose.models.School || mongoose.model("School", schema);
