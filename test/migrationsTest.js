process.env.NODE_ENV = 'test'
const expect = require('chai').expect
const bookshelf = require('../bookshelf');
const knex = require('knex')(require('../knexfile')[process.env.NODE_ENV]);
// const api = request('http://localhost:3001')


describe("checking migrations", function () {

    describe('checking tables ', function () {

        it('checking for pets table', function (done) {
            knex.schema.hasTable('pets').then(exists => {
                console.log(exists);
                expect(exists).to.equal(true);
                done();
            })
        });

        it('checking for owners table', function (done) {
            knex.schema.hasTable('owners').then(exists => {
                console.log(exists);
                expect(exists).to.equal(true);
                done();
            })
        });
    });

    describe('checking for columns', function () {
        it('checking for name column in pets', function (done) {
            knex.schema.hasColumn ('pets', 'name').then(exists => {
                console.log(exists);
                expect(exists).to.equal(true);
                done();
            })
        });

        it('checking for age column pets', function (done) {
            knex.schema.hasColumn('pets', 'age').then(exists => {
                console.log(exists);
                expect(exists).to.equal(true);
                done();
            })
        });

        it('checking for name column in owners', function (done) {
            knex.schema.hasColumn('owners', 'name').then(exists => {
                console.log(exists);
                expect(exists).to.equal(true);
                done();
            })
        });

        it('checking for phone column in owners', function (done) {
            knex.schema.hasColumn('owners', 'phone').then(exists => {
                console.log(exists);
                expect(exists).to.equal(true);
                done();
            })
        });
    });

    describe('checking relationship between owners and pets', function () {
        it('checking to see if pets can be connected to owners', function (done) {
            knex.schema.hasColumn('pets', 'owner_id').then(exists => {
                console.log(exists);
                expect(exists).to.equal(true);
                done();
            })
        });
    });
});