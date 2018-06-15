const bookshelf = require('../bookshelf');

const Owner = bookshelf.Model.extend({
    tableName: 'owners',
    hasTimestamps: true,
    pets: function () {
        return this.hasMany('Pet');
    }
});

module.exports = bookshelf.model('Owner', Owner);