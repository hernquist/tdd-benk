const expect = require("chai").expect;
const knex = require("knex")(require("../knexfile")["test"]);
const bookshelf = require("bookshelf")(knex);

const Pet = require("../models/pet");
const Owner = require("../models/owner");

describe("check number of pets and owners", () => {
  it("fetches the pets and tests the number of entry in the seed data ", async () => {
    const pets = await Pet.fetchAll().then(data => data);
    expect(pets.length).to.equal(6);
  });

  it("fetches the owners and tests the number of entry in the seed data ", async () => {
    const owners = await Owner.fetchAll().then(data => data);
    expect(owners.length).to.equal(3);
  });

  it("fetches a specfic owner and returns the phone number", async () => {
    const owner = await Owner.query({
      where: { name: "Andrew" }
    }).fetch();

    expect(owner.attributes.phone).to.equal("222-222-2222");
  });

  it("fetches a specfic pet and returns the age", async () => {
    const owner = await Pet.query({
      where: { name: "Leonard" }
    }).fetch();

    expect(owner.attributes.age).to.equal(23);
  });

  it("fetches a specfic pet and returns the owner name", async () => {
    const pet = await Pet.query({
      where: { name: "Leonard" }
    }).fetch();
    const owner = await Owner.query({
      where: { id: pet.attributes.owner_id }
    }).fetch();
    expect(owner.attributes.name).to.equal("Andrew");
  });
});
