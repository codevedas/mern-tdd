import request from "supertest"
import { expect } from "chai";
import MessageApp from "../app.js"

describe("MessageApp Test", function(){
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
