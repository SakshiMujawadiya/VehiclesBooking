const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

// ✅ FIX 1: Add `next` to async pre-save function
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Corrected line
  this.password = await bcrypt.hash(this.password, 10);
  next(); // Call next after hashing
});

// ✅ FIX 2: Keep this unchanged (already correct)
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
