import request from "supertest"
import { expect } from "chai";
import MessageApp from "../app.js"

describe("MessageApp Test", function(){
  it("posts a message", function(done) {
    var data = {
      content: "hi world"
    };
    const res = request(MessageApp)
    .post("/message")
    .send(data)
    .set("Accept", "application/json")
    res.expect(200)
    .end(function(err, res) {
      if (err) {
        return done(err)
      }
      expect(res.body[0].content).to.equal('hi world');
      done()
    })
  })
  it("gets all messages", function(done) {
    const res = request(MessageApp)
    .get("/")
    res.expect(200)
    .end(function(err, res) {
      if (err) {
        return done(err)
      }
      expect(res.body.length).to.equal(1)
      done()
    })
  })
})
