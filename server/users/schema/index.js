import mongoose from 'mongoose';

import nanoid from '../../../config/nanoid.js';

const { Schema } = mongoose;

const usersSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(),
    },
    fullName: {
      type: String,
    },
    password:{
      type: String,
    },
    email: {
      type: String,
    },
    Mobile: {
      type: String,
    },
    roles: {
      type: Array,
      required: false,
    },
  },
  { collection: 'users', timestamps: true },
);

const User = mongoose.model('users', usersSchema);

export default User;
