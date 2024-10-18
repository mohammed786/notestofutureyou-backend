// routes/relationships.js
const express = require('express');
const Relationship = require('../models/Relationship');
const authenticateJWT = require('../middleware/authMiddleware');
const router = express.Router();

// Create relationship route (protected)
router.post('/relationships', authenticateJWT, async (req, res) => {
  const { user_id, target_user_id, relationshipType } = req.body;
  
  try {
    const relationship = await Relationship.create({
      user_id: req.user.id, // Use the logged-in user's ID
      target_user_id,
      relationshipType,
    });
    res.status(201).json(relationship);
  } catch (err) {
    res.status(500).json({ message: 'Error creating relationship', error: err.message });
  }
});


// Get relationships for a user
router.get('/relationships/:user_id', authenticateJWT,  async (req, res) => {
    try {
      const { user_id } = req.params;
      const relationships = await Relationship.findAll({
        where: { user_id },
        include: [User],
      });
      res.status(200).json(relationships);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
