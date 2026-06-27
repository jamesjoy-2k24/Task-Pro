import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
     // default user
  }



}, { timestamps: true });

// Save password hash 
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  try{
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  }catch (err){
  throw err;
  }
  // Login time password compare பண்ண
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


});

export default mongoose.model('User', userSchema);