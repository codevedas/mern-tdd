//controller.js
import MessageModel from './model'

let messageApp = new MessageModel(`/\///json/\//testMessages.json`)

function getAll(){
  return new Promise((resolve, reject) => {
    var result = messageApp.getAll()
    if (result !== []) {
      resolve(result)
    } else {
      reject(result)
    }
  })
}
module.exports = {
  getAll,
  post
}
