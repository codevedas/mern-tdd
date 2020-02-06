import request from "supertest"
import { expect } from "chai";
import MessageApp from "../app.js"

describe("MessageApp Test", function(){
  let data;
  it("posts a message", function(done) {
    data = {
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
      expect(res.body.length).to.equal(1);
      expect(res.body[0].id).to.equal(1);
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
      expect(res.body[0].id).to.equal(1)
      expect(res.body[0].content).to.equal('hi world')
      done()
    })
  })
  it("deletes a message",
  function(done) {
    const res = request(MessageApp)
    .delete("/delete/1")
    .set("Accept", "application/json")
    res.expect(200)
    .end(function(err, res) {
      if (err) {
        return done(err)
      }
      expect(res.body.length).to.equal(0)
      done()
    })
  })
})
