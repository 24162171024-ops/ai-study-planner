const express = require('express');
const router = express.Router();

router.post('/suggest', async (req, res) => {
  try {
    res.json({ suggestion: 'AI suggestion will go here' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;