import { expect } from "chai";
import MessageApp from './app.js'
describe("app", function() {
  let testApp = new MessageApp
  it("app has messages", function() {
    expect(testApp.messages).to.deep.equal([]);
  });
});
