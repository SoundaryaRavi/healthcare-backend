const express = require('express');
const router = express.Router();

const { getTips } = require('../controllers/tips.controller');

router.get("/", getTips);

module.exports = router;