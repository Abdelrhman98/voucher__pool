import mongoose from 'mongoose';

import nanoid from '../../../config/nanoid.js';

const { Schema } = mongoose;

const VoucherSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(),
    },
    voucherCode: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
    },
    createdBy: {
      type: String,
      required: true,
    },
    isUsed: {
      type: Boolean,
      default: false,
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
