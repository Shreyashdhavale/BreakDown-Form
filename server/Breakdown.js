// models/Breakdown.js
const mongoose = require('mongoose');

const breakdownSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  shift: { type: String, required: true },
  machineNo: { type: String, required: true },
  problem: { type: String, required: true },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

module.exports = mongoose.model('Breakdown', breakdownSchema);
