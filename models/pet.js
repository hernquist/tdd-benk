const bookshelf = require('../bookshelf');

const Pet = bookshelf.Model.extend({
    tableName: 'pets',
    hasTimestamps: true,
    owner: function () {
        return this.belongsTo('Owner');
    }
});

module.exports = bookshelf.model('Pet', Pet);