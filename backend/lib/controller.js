//controller.js
import MessageModel from './model'

function getAll(){
  return MessageModel.find()
}

function post(content){
  let newMessage = new MessageModel({content: content})
  return newMessage.save()
}

function deleteMessage(id){
  return MessageModel.deleteOne({_id: id})
}

function getSingleMessage(id){
  return MessageModel.findOne({_id: id})
}

function updateMessage(id, content){
  return new Promise((resolve, reject) => {
    let message = messageApp.update(id, content)
    if (message.length !== 0) {
      resolve(message)
    } else {
      reject("You can't post an empty message")
    }
  })
}

module.exports = {
  getAll,
  getSingleMessage,
  post,
  deleteMessage,
  updateMessage
}
