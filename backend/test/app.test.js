import request from "supertest"
import mongoose from "mongoose"
import { expect } from "chai";
import MessageApp from "../app.js"
let data;
let id;

describe("message API endpoint tests", function(){

  before(function (done) {
    mongoose.connect('mongodb://localhost/testMessages', { useNewUrlParser: true, useFindAndModify: false }, function(){
      mongoose.connection.db.dropDatabase(function(){
        done()
      })
    })
  })

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
      expect(res.body.content).to.equal('hi world');
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
      id = res.body[0]._id;
      expect(res.body.length).to.equal(1)
      expect(res.body[0].content).to.equal('hi world')
      done()
    })
  })

  it("gets a single message", function(done) {
    const res = request(MessageApp)
    .get(`/message/${id}`)
    res.expect(200)
    .end(function(err, res) {
      if (err) {
        return done(err)
      }
      expect(res.body.content).to.equal("hi world")
      done()
    })
  })

  it("updates a message", function(done) {
    data = {
      content: "Hello World"
    }
    const res = request(MessageApp)
    .put(`/update/${id}`)
    .send(data)
    .set("Accept", "application/json")
    res.expect(200)
    .end(function(err, res) {
      if (err) {
        return done(err)
      }
      expect(res.body.content).to.equal("Hello World")
      done()
    })
  })

  it("deletes a message",
  function(done) {
    const res = request(MessageApp)
    .delete(`/delete/${id}`)
    .set("Accept", "application/json")
    res.expect(200)
    .end(function(err, res) {
      if (err) {
        return done(err)
      }
      expect(res.body.deletedCount).to.equal(1)
      done()
    })
  })
})

describe("Message api errors correctly", function(){
  it("posts empty message errors", function(done) {
    data = {
      content: ""
    };
    const res = request(MessageApp)
    .post("/message")
    .send(data)
    .set("Accept", "application/json")
    res.expect(404)
    .end(function(err, res) {
      if (err) {
        return done(err)
      }
      expect(res.body).to.equal("You can't post an empty message")
      done()
    })
  })

  it("gets all errors when no messages", function(done) {
    const res = request(MessageApp)
    .get("/")
    res.expect(404)
    .end(function(err, res) {
      if (err) {
        return done(err)
      }
      expect(res.body).to.equal("No messages in database")
      done()
    })
  })

  it("errors if cant find single message", function(done) {
    const res = request(MessageApp)
    .get("/message/5e3488081b8bfa79a6625542")
    res.expect(404)
    .end(function(err, res) {
      if (err) {
        return done(err)
      }
      expect(res.body).to.equal("Message not found in database")
      done()
    })
  })

  it("errors on bad update", function(done) {
    data = {
      content: "Hello World"
    }
    const res = request(MessageApp)
    .put('/update/5e3488081b8bfa79a6625542')
    .send(data)
    .set("Accept", "application/json")
    res.expect(404)
    .end(function(err, res) {
      if (err) {
        return done(err)
      }
      expect(res.body).to.equal("Message not found in database")
      done()
    })
  })

  it("errors deleting message that doesnt exist", function(done) {
    const res = request(MessageApp)
    .delete("/delete/5e3489f97d2ed07a96a02103")
    .set("Accept", "application/json")
    res.expect(404)
    .end(function(err, res) {
      if (err) {
        return done(err)
      }
      expect(res.body).to.equal("Message not found in database")
      done()
    })
  })
})
