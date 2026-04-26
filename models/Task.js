const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  subject: String,
  dueDate: Date,
  priority: { type: String, enum: ['low', 'medium', 'high'] },
  completed: { type: Boolean, default: false },
  aiSuggestion: String,
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);