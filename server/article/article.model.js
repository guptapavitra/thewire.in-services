const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Article Schema
 */
const ArticleSchema = new mongoose.Schema({
  articleTitle: {
    type: String,
    required: true
  },
  articleContent: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
ArticleSchema.method({
});

/**
 * Statics
 */
ArticleSchema.statics = {
  /**
   * Get article
   * @param {ObjectId} id - The objectId of article.
   * @returns {Promise<Article, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((article) => {
        if (article) {
          return article;
        }
        const err = new APIError('No such article exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List articles in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of articles to be skipped.
   * @param {number} limit - Limit number of articles to be returned.
   * @returns {Promise<Article[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Article
 */
module.exports = mongoose.model('Article', ArticleSchema);
