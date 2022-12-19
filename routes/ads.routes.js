const express = require('express');
const router = express.Router();
const AdsController = require('../controllers/ads.controller');
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUpload');

router.get('/ads/', AdsController.getAll);
router.get('/ads/:id', AdsController.getById);
router.get('/ads/search/:searchPhrase', AdsController.getBySearchPhrase);
router.post('/ads/',  authMiddleware, imageUpload.single('photo'), AdsController.post);
router.put('/ads/:id',  authMiddleware, imageUpload.single('photo'), AdsController.put);
router.delete('/ads/:id', authMiddleware, AdsController.delete);

module.exports = router;