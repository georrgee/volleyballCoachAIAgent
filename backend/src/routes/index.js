const express = require('express');
const router = express.Router();

router.use('/chat', require('./chat'));
router.use('/sessions', require('./sessions'));

// Health check can be moved here if desired
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Volleyball Coach API is running',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;