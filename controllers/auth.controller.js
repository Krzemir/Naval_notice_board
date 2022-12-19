const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');
const mongoSanitize = require('mongo-sanitize');


exports.register = async (req, res) => {
  try {

    const { login, password, phone } = mongoSanitize(req.body);

    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

      if (login && typeof login === 'string' && password && typeof password === 'string' && phone && typeof phone === 'string' && req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
        const userWithLogin = await User.findOne({ login });
        if (userWithLogin) {
          fs.unlinkSync(req.file.path);
          return res.status(409).send({ message: 'User exists already' });
        }

        const user = await User.create({ 
          login, password: await bcrypt.hash(password, 10), 
          phone,
          avatar: req.file.filename });
        
        res.status(201).send({ message: 'User created successfully: ' + user.login });
    } else {
      res.status(400).send({ message: 'Invalid request' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.login = async (req, res) => {
  
  try {
    const { login, password } = req.body;

    if (login && typeof login ==='string' && password && typeof password ==='string') {

      const user = await User.findOne({ login });
    
      if (!user) {
        return res.status(400).send({ message: 'User or password incorrect' });
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.login = user.login;
          const userId = user.id;
          req.session.userId = userId;
          res.status(200).send({ message: 'Login successful'})
        } else {
          return res.status(400).send({ message: 'User or password incorrect' });
        }
      }
    } else {
      res.status(400).send({ message: 'Bad request' });
    } 
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.getUser = async (req, res) => {
  console.log('session', req.session.login)
    res.send({ message: `User: ${req.session.login } is logged in`, user: req.session.login })
  }

exports.delete = async (req, res) => {
  try {
    req.session.destroy();
    return res.status(200).send({ message: 'Session destroyed' });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}