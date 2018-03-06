const knex = require('knex')(require('./knexfile')["test"]);
const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry')

module.exports = bookshelf;