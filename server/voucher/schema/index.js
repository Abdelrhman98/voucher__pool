import mongoose from 'mongoose';

import nanoid from '../../../config/nanoid.js';

const { Schema } = mongoose;

const VoucherSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(),
    },
    amount: {
      type: Number,
    },
    usedBy:{
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    appliedAt: {
      type: Date,
    },
  },
  { collection: 'voucher', timestamps: true },
);

const Voucher = mongoose.model('voucher', VoucherSchema);

export default Voucher;
