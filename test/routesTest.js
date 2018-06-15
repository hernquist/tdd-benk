process.env.NODE_ENV = "test";
const expect = require("chai").expect;
const request = require("supertest");
const api = request("http://localhost:3001");



describe("Owners", function() {
  describe("get all", function() {
    it("tests first and last from all owners", function(done) {
      api
        .get("/")
        .set("Accept", "application/json")
        .expect(200) //tests the status of the call
        .end(function(err, res) {
          if (err) return done(err);
          
          let owners = res.body.map(owner => owner);
          let first = owners[0] 
          let last = owners[owners.length-1];
          expect(first).to.have.property("phone");
          expect(last).to.have.property("phone");
          done();
        });
    });
  });
});
