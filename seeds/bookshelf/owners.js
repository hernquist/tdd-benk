const bookshelf = require('../../bookshelf');

const Pet = require('../../models/pet');
const Owner = require('../../models/owner');
const data = require('../data');

const { pets, owners } = data;

const fullName = person => `${person.first_name} ${person.last_name}`;

const deleteAll = model => model.where('id', '!=', 0).destroy();

const seed = () => {
    await deleteAll(Owner);
    await deleteAll(Pet);

    const [A, B, C] = await Promise.all([
        new Owner(owners.A).save(),
        new Owner(owners.B).save(),
        new Owner(owners.C).save()
    ]);

    console.log('Owners Added!');

    const [L, M, N, O, P, Q] = await Promise.all([
        A.pets().create(new Pet(pets.L)),
        A.pets().create(new Pet(pets.M)),
        A.pets().create(new Pet(pets.N)),
        B.pets().create(new Pet(pets.O)),
        B.pets().create(new Pet(pets.P)),
        C.pets().create(new Pet(pets.Q))
    ]);

    console.log('Pets Added!');
    
    bookshelf.knex.destroy()
        .then(() => console.log('db connections destroyed'));
    return null;
};

// seed();

try {
    seed();
} catch (err) {
    console.error('ERROR:', err);
    process.exit(1);
}

// module.exports = seed;