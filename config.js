module.exports = {
  development: {
    db: 'mongodb://127.0.0.1/blog',
    collections: ['posts']
  },
  production: {
    db: 'mongodb://admin:coding@ds037468.mongolab.com:37468/heroku_app17320512',
    collections: ['posts']
  }
}