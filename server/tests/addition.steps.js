const { defineFeature, loadFeature } = require("jest-cucumber");
const chai = require("chai");
const should = chai.should() // requires initialisation
const assert = require("assert");
const feature = loadFeature('features/addition.feature');

defineFeature(feature, (test) => {
  let answer;

  // Originally I through I need to do this before each run of scenario outline, but it is not
  // needed. However it is needed if we would have more tests in one defineFeature()
  /* beforeEach(() => {
    answer = 0;
  }) */

  test("It should be possible to add numbers", ({given, when, then}) => {
    given(/^I start with (.*)$/, (number) => {
      answer = +number;
    });
    when(/^I add (.*)$/, (number) => {
      answer = answer + +number;
    });
    then(/^I end up with (.*)$/, (result) => {
      chai.assert.equal(answer, result);
      answer.should.equal(+result); // verbose, just like BDD style
      answer.should.be.a("number"); // allows typechecking
      chai.expect(answer).to.equal(+result);
      chai.expect(answer).to.be.a("number");
      assert.equal(answer, result);
    });
  });
});
