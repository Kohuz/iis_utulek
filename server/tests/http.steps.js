const { defineFeature, loadFeature } = require("jest-cucumber");
const request = require("supertest");
const expect = require("chai").expect
const assert = require("assert");

const feature = loadFeature('features/http.feature');

defineFeature(feature, (test) => {
  let res

  test("I want to Get /test", ({given, when, then}) => {
    when("I send a request to /test", (number) => {
      res = request("http://localhost:8080")
        .get('/test')
    });
    then("I receive response", (result) => {
      expect(res.statusCode).to.equal(200);
    });
  });
});
