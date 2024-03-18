import express from 'express';

const router = express.Router();

// Example user route
router.get('/', (req, res) => {
  res.json({ message: 'User route' });
});

export default router;
