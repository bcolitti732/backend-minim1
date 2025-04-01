import { ObjectId, Schema, model } from 'mongoose';

export interface IRating {
  _id?: ObjectId;
  user: ObjectId;
  score: number;
  comment: string;
  createdAt: Date;
}

const ratingSchema = new Schema<IRating>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  score: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: false }, //opcional per simplificarme la vida
  createdAt: { type: Date, default: Date.now },
});

export const RatingModel = model("Rating", ratingSchema);