const express = require('express');
const chatController = require('../controllers/chatController');
const { validate } = require('../middleware/validation');
const { chatMessageSchema } = require('../services/validationService');

const router = express.Router();

router.post('/', validate(chatMessageSchema), chatController.sendMessage);

// new route to handle sessionId in the URL
router.post('/:sessionId', validate(chatMessageSchema), chatController.sendMessage);


module.exports = router;
