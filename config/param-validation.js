const Joi = require('joi');

module.exports = {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/users
  createArticle: {
    body: {
      articleTitle: Joi.string().required(),
      articleContent: Joi.string().required()
    }
  },

  // UPDATE /api/users/:articleId
  updateArticle: {
    body: {
      articleTitle: Joi.string().required(),
      articleContent: Joi.string().required()
    },
    params: {
      articleId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
