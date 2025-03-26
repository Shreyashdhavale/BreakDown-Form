// routes/breakdownRoutes.js
const express = require('express');
const router = express.Router();
const breakdownController = require('./breakdownController');

// POST endpoint for creating a breakdown report
router.post('/breakdown', breakdownController.createBreakdown);
router.get('/breakdown', breakdownController.getAllBreakdowns);

module.exports = router;
