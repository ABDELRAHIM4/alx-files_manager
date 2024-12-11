const express = require('express');
const router = express.Router();
const App = require('../controllers/AppController');

router.get('/status', App.getStatus);
router.get('/stats', App.getStats);

module.exports = router;
