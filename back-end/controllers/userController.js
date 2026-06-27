import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (id,role) => {
  return jwt.sign({id,role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password,role } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: 'user already exists' });

  const userRole = role === 'admin'?'admin':'user';  
    
    user = await User.create({ name, email, password,role:userRole });
     
    const token = generateToken(user._id,user.role);
     res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id,user.role)
          }) 

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    
    console.log("Input password:", password);
    console.log("DB hash:", user.password);
    console.log("isMatch:", isMatch);
    
    
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    
    const token = generateToken(user._id,user.role);
    res.json({ token, user: { _id: user._id, name: user.name, email:user.email,role:user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};