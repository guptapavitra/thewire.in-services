const express = require('express');
// const userRoutes = require('./server/user/user.route');
const authRoutes = require('./server/auth/auth.route');
const articleRoutes = require('./server/article/article.route');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
// router.use('/users', userRoutes);
// mount user routes at /articles
router.use('/articles', articleRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

module.exports = router;
