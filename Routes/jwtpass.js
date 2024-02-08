const express = require('express');
const { passport, jwt, User } = require('./passportConfig');

const router = express.Router();
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
  const secretKey = process.env.JWT_SECRET || 'defaultSecretKey';
  const jwtOptions = {
    secretOrKey: secretKey,
  };

router.post('/register', async (req, res) => {
    const { username, email, password, phoneNumber } = req.body;
  
    try {
    
      const newUser = await User.create({ username, email, password, phoneNumber });
  
      res.json({ message: 'Registration successful', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      
      const user = await User.findOne({ username, password });
  
      if (user) {
        const token = jwt.sign({ id: user.id, username: user.username }, jwtOptions.secretOrKey);
        res.json({ message: 'Login successful', token });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'Protected route', user: req.user });
});

module.exports = router;
