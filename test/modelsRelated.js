const expect = require("chai").expect;
const knex = require("knex")(require("../knexfile")["test"]);
const bookshelf = require("bookshelf")(knex);

const Pet = require("../models/pet");
const Owner = require("../models/owner");

describe("Adds Pet Attached to Owner", () => {
  let newOwner;
  let testPets;

  before(async () => {
    newOwner = await new Owner({
      name: "Sally",
      phone: "444-444-4444"
    }).save();

    testPets = await Promise.all([
      newOwner.pets().create(new Pet({ name: "Snoopy", age: 87 })),
      newOwner.pets().create(new Pet({ name: "Bark", age: 99 })),
      newOwner.pets().create(new Pet({ name: "Sophie", age: 1 }))
    ]);
  });

  after(() => {
    newOwner.destroy();
    testPets.map(pet => pet.destroy());
  });

  it("successfully saves an pet and returns the age", async () => {
    const query = await Pet.query({
      where: { name: "Snoopy" }
    }).fetch();

    expect(query.attributes.age).to.equal(87);
  });

  it("successfully saves an owner and returns the phone number", async () => {
    const query = await Owner.query({
      where: { name: "Sally" }
    }).fetch();

    expect(query.attributes.phone).to.equal("444-444-4444");
  });

  it("successfully saves a pet with correct owner_id", async () => {
    const query = await Owner.query({
      where: { name: "Sally" }
    }).fetch();
    const secondQuery = await Pet.query({
      where: { name: "Bark" }
    }).fetch();

    expect(query.attributes.id).to.equal(secondQuery.attributes.owner_id);
  });

  it("grabs all pets by owner id", async () => {
    function petSummarizer(pet) {
      return `name: ${pet.attributes.name}, age: ${
        pet.attributes.age
      }, owner_id: ${pet.attributes.owner_id}`;
    }

    function ownerSummerizer(owner) {
      const pets = owner.relations.pets
        ? owner.relations.pets.map(petSummarizer)
        : null;
      return pets;
    }
    const ownerReturnInfo = await Owner.fetchAll({ withRelated: ["pets"] });
    const ownerData = ownerReturnInfo.map(ownerSummerizer);
    const petsByOwnerId = ownerData[0];

    expect(petsByOwnerId.length).to.equal(3);
  });
});

