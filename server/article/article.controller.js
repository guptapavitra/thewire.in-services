const chalk = require('chalk');
const Article = require('./article.model');

/**
 * Load article and append to req.
 */
function load(req, res, next, id) {
  Article.get(id)
    .then((article) => {
      req.article = article; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get article
 * @returns {Article}
 */
function get(req, res) {
  return res.json(req.article);
}

/**
 * Create new article
 * @property {string} req.body.articleTitle - The articleTitle of article.
 * @property {string} req.body.articleContent - The articleContent of article.
 * @returns {Article}
 */
function create(req, res, next) {
  const article = new Article({
    articleTitle: req.body.articleTitle,
    articleContent: req.body.articleContent
  });

  article.save()
    .then(savedArticle => res.json(savedArticle), (e) => {
      console.log(chalk.red(e));
      throw e;
    })
    .catch(e => next(e));
}

/**
 * Update existing article
 * @property {string} req.body.articleTitle - The articleTitle of article.
 * @property {string} req.body.articleContent - The articleContent of article.
 * @returns {Article}
 */
function update(req, res, next) {
  const article = req.article;
  article.articleTitle = req.body.articleTitle;
  article.articleContent = req.body.articleContent;

  article.save()
    .then(savedArticle => res.json(savedArticle))
    .catch(e => next(e));
}

/**
 * Get article list.
 * @property {number} req.query.skip - Number of articles to be skipped.
 * @property {number} req.query.limit - Limit number of articles to be returned.
 * @returns {Article[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Article.list({ limit, skip })
    // .then(article =>
    //   new Promise((resolve) => {
    //     setTimeout(() => { resolve(article); }, 5000);
    //   })
    // )
    .then(articles => res.json(articles))
    .catch(e => next(e));
}

/**
 * Delete article.
 * @returns {Article}
 */
function remove(req, res, next) {
  const article = req.article;
  article.remove()
    .then(deletedArticle => res.json(deletedArticle))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
