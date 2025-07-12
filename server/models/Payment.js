const mongoose = require('mongoose');

// Payment Schema
const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  invoiceId: { type: String, required: true }, // Invoice ID or reference number
  status: { type: String, enum: ['paid', 'pending', 'failed'], required: true }, // Payment status
});

// Payment model
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
