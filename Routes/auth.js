const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../model/signup");
require('dotenv').config();

const router = express.Router();

const createTokens = (user) => {
  const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

// User signup endpoint
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, phoneNumber } = req.body;

    const existingUserByEmail = await User.findOne({email} );
    if (existingUserByEmail) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const existingUserByUsername = await User.findOne( {username} );
    if (existingUserByUsername) {
      return res.status(400).json({ error: 'User with this username already exists' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword, phoneNumber });
    await newUser.save();
    // const tokens = createTokens(newUser);

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User login endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    
    const isValidPassword = await existingUser.isValidPassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }


    const tokens = createTokens(existingUser);

    res.status(200).json({ message: 'Login successful', user: existingUser.username, ...tokens });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
