import mongoose from 'mongoose';

const userReg = new mongoose.Schema({
  fullname: { type: String, required: true, maxLength: 100 },
  gender: { type: String, required: true, enum: ['male', 'female'], default: 'male' },
  email: { type: String, required: true, lowercase: true, unique: true }, 
  username: { type: String, required: true, lowercase: true, unique: true },
  role: { type: String, required: true, lowercase: true, default: 'regular-user' },
  password: { type: String, required: true, minLength: 10 }, 
  phone: { type: String, required: true }
}, { timestamps: true });

export const User = mongoose.model('User', userReg);
