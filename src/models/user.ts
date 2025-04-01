import { ObjectId, Schema, model } from 'mongoose';

export interface IUser {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
  phone: string;
  available: boolean;
  packets: ObjectId[];
  ratings?: ObjectId[]; // Relación con las valoraciones
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: (props: any) => `${props.value} is not a valid email!`,
    },
  },

  password: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  available: {
    type: Boolean,
    required: true,
    default: true,
  },

  packets: [{ type: Schema.Types.ObjectId, ref: "Packet" }],

  ratings: [{ type: Schema.Types.ObjectId, ref: "Rating" }], // Relación con las valoraciones
});

export const UserModel = model("User", userSchema);