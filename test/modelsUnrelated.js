const expect = require('chai').expect;
const knex = require('knex')(require('../knexfile')['test']);
const bookshelf = require('bookshelf')(knex);

const Pet = require('../models/pet');
const Owner = require('../models/owner');

describe('Add Pet or Owner -- no relation', () => {
    let pet;
    let owner;

    before(async () => {
        pet = await new Pet({
            name: 'Fido',
            age: 12,
        }).save();

        owner = await new Owner({
            name: 'Freddie',
            phone: "333-333-3333"
        }).save();
    });

    after(() => {
        pet.destroy();
        owner.destroy();
    });

    it('successfully saves an pet and returns the name', async () => {
        const aa = await Pet.query({
            where: { name: 'Fido' }
        }).fetch();

        expect(aa.attributes.age).to.equal(12);
    });

    it('successfully saves an owner and returns the name', async () => {
        const aa = await Owner.query({
            where: { name: 'Freddie' }
        }).fetch();

        expect(aa.attributes.phone).to.equal("333-333-3333");
    });


});