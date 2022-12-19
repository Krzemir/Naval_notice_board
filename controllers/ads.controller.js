const Ad = require('../models/ad.model');
const getImageFileType = require('../utils/getImageFileType');
const path = require('path');
const fs = require('fs');
const mongoSanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    res.json(await Ad.find().populate('user'));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const ad = await Ad.find({ _id: req.params.id}).populate('user');
    res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getBySearchPhrase = async (req, res) => {
  try {
      const ad = await Ad.find({
        $or: [
          { title: {$regex: req.params.searchPhrase, $options: 'i' } },
          { content: {$regex: req.params.searchPhrase, $options: 'i' } }
        ]}).populate('user')

      res.json(ad);
    } 
    catch (err) {
      res.status(500).json({ message: err });
    };
  };

exports.post = async (req, res) => {
  
  try {

    const { title, content, price, date, localization } = mongoSanitize(req.body);

    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
    
      if ( title && typeof title === 'string' && content && typeof content === 'string' && price && typeof price === 'string' && date && typeof date === 'string' && localization && typeof localization === 'string' && req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
        
      const newAd = new Ad({
        title: title, 
        content: content, 
        price: price,
        date: date,
        localization: localization,
        user: req.session.userId,
        photo: req.file.filename
      });
      await newAd.save();
      res.json({ message: 'New ad added successfully', ad: newAd });
    } else {
      res.status(409).send({ message: 'Invalid data added' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  
  try {

    const { title, content, price, date, localization } = mongoSanitize(req.body);
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    if ( title && typeof title === 'string' && content && typeof content === 'string' && price && typeof price === 'string' && date && typeof date === 'string' && localization && typeof localization === 'string') {

        const ad = await Ad.findById(req.params.id);
        if (ad) {
          ad.title = title;
          ad.content = content;
          ad.price = price;
          ad.date = date;
          ad.localization = localization;
          if (req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
            fs.unlinkSync((path.join(__dirname, '../public/uploads/', ad.photo)));
            ad.photo = req.file.filename;
          }
          await ad.save();
          res.json({ message: 'Ad updated', adId: ad._id });
      } 
    } else {
      res.status(409).send({ message: 'Invalid data added' });
    };
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (ad) {
      fs.unlinkSync((path.join(__dirname, '../public/uploads/', ad.photo)));
      await ad.deleteOne({_id: req.params.id});
      
      res.json({ message: 'Ad deleted', ad: ad });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
