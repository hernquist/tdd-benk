process.env.NODE_ENV = 'test'
const expect = require('chai').expect
const bookshelf = require('../bookshelf');
const knex = require('knex')(require('../knexfile')[process.env.NODE_ENV]);
// const request = require('supertest')
// const api = request('http://localhost:3001')


describe("bookshelf and knexfile config", function () {

    describe('knexfile.js config', function () {

        it('looking for the knexfile to export a client of pg', function () {
            // console.log("knex:", knex());
            expect(knex.queryBuilder().client.config.client).to.equal('pg');
        });

        it('looking for a database name ', function () {
            // console.log("knex:", knex());
            expect(knex.queryBuilder().client.config.connection.database).to.equal('bookshelf-pets-test');
        });

        it('looking for the knexfile to export a seeds path', function () {
            // console.log("knex:", knex());
            expect(knex.queryBuilder().client.config.seeds).to.eql({
                directory: './seeds/dev'
            });
        });

    });

    describe('making sure knexfile is being passing through bookshelf', function () {

        it('looking for client to be passed through bookshelf', function () {
            expect(bookshelf.knex.queryBuilder().client.config.client).to.equal('pg');
        });
    
        it('looking for a database name from bookshelf ', function () {
            expect(bookshelf.knex.queryBuilder().client.config.connection.database).to.equal('bookshelf-pets-test');
        });

        it('looking for the seeds path from bookshelf', function () {
            expect(bookshelf.knex.queryBuilder().client.config.seeds).to.eql({
                directory: './seeds/dev'
            });
        });

        it('seeing the registry plugin was initialized',  function(){
            expect(bookshelf.registry).to.eql({})
        });
    });

    describe('testing knexfile.js in development mode', function () {
        const knexDev = require('knex')(require('../knexfile')['development']);

        it('looking for the knexfile to export a client of pg', function () {
            // console.log("knex:", knex());
            expect(knexDev.queryBuilder().client.config.client).to.equal('pg');
        });

        it('looking for a database name ', function () {
            // console.log("knex:", knex());
            expect(knexDev.queryBuilder().client.config.connection.database).to.equal('bookshelf-pets-development');
        });

        it('looking for the knexfile to export a seeds path', function () {
            // console.log("knex:", knex());
            expect(knexDev.queryBuilder().client.config.seeds).to.eql({
                directory: './seeds/dev'
            });
        });
    })
});