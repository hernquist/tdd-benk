process.env.NODE_ENV = "test";
const expect = require("chai").expect;
const request = require("supertest");
const api = request("http://localhost:3001");

describe("OWNERS", function() {
  describe("GET / ", function() {
    it("responds or tests all owners", function(done) {
      api
        .get("/")
        .set("Accept", "application/json")
        .expect(200) //tests the status of the call
        .end(function(err, res) {
          if (err) return done(err);
          let owners = res.body.map(owner => owner);
          expect(owners[0]).to.have.property("phone");
          done();
        });
    });
  });
});
