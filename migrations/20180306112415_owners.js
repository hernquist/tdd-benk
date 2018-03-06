exports.up = function (knex) {
    return knex.schema.hasTable('owners').then(exists => {
        if (!exists) {
            return knex.schema
                .createTable('owners', table => {
                    table.increments('id').primary();
                    table.string('name');
                    table.string('phone');
                    table.timestamps(true, true);
                })
                .then(() => knex.schema.table('pets', table => {
                    table.integer('owner_id').unsigned().index();
                    table.foreign('owner_id').references('owners.id');
                }));
        }
    })
}

exports.down = knex =>
    knex.schema
        .table('pets', table => {
            return table.dropColumn('owner_id');
        })
        .then(() => knex.schema.dropTableIfExists('owners'));