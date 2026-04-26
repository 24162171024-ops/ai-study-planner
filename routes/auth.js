const express = require('express');
const router = express.Router();

// Placeholder - we'll add real auth later
router.post('/register', (req, res) => {
  res.json({ message: 'Register route works' });
});

router.post('/login', (req, res) => {
  res.json({ message: 'Login route works' });
});

module.exports = router;
