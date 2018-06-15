exports.up = function (knex) {
    return knex.schema.hasTable('pets').then(exists => {
        if (!exists) {
            return knex.schema.createTable('pets', table => {
                table.increments('id').primary();
                table.string('name');
                table.integer('age');
                table.timestamps(true, true);
            })
        }
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('pets');
}
