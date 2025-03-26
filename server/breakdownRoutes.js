// routes/breakdownRoutes.js
const express = require('express');
const router = express.Router();
const breakdownController = require('./breakdownController');

router.post('/breakdown', breakdownController.createBreakdown);

module.exports = router;
