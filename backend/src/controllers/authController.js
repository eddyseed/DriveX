const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwUtils');
const { PrismaClient } = require('@prisma/client');
// import { supabase } from './supabaseClient'; // Make sure to configure this in a separate file

const prisma = new PrismaClient();

const signup = async (req, res) => {
  try {
    const { name, email, password, role, confirmPassword, mobile, terms } = req.body;

    // Step 1: Field validation
    if (!name || !email || !password || !confirmPassword || !mobile || !role) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    if (!/^\d{10}$/.test(mobile)) {
      return res.status(400).json({ success: false, message: 'Mobile number must be 10 digits' });
    }

    if (!terms) {
      return res.status(400).json({ success: false, message: 'You must accept the terms and conditions' });
    }

    // Step 2: Check if user already exists
    const userExists = await prisma.users.findUnique({ where: { email } });
    if (userExists) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    }

    // Step 3: Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 4: Create user in DB
    const newUser = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        mobile,
      },
    });

    // Step 5: Generate token
    const token = generateToken(newUser);

    // Step 5.1: Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // set to true in production (HTTPS)
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    // Step 6: Send response
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        mobile: newUser.mobile,
      },
      token,
    });


  } catch (error) {
    console.error('Signup Error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    // Step 1: Find user using Prisma
    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ success: false, message: "User doesn't exist" });
    }

    // Step 2: Password Check using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }

    // Step 3: Token Generation (Assuming you have a generateToken() util)
    const token = generateToken(user);

    // Step 4: Set Cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // set to true in production (HTTPS)
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    // Step 5: Respond
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
  });
  res.status(200).json({ message: 'Logged out' });
};
const returnUser = (req, res) => {
  try {
    const user = req.user; // from the JWT middleware
    if (!user) return res.status(404).json({ message: 'Please log in to view details!' });

    // You can fetch full user from DB here if needed
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}


module.exports = { signup, login, logout, returnUser };
