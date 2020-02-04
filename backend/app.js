class MessageApp {
  constructor() {
    this.messages = []
  }
  post(content){
    let item = {
      id: (this.messages.length + 1),
      content: content,
      date: new Date()
    }
    this.messages.push(item)
    return this.messages
  }
  get(id){
    return this.messages[id]
  }
  update(id, update){
    this.messages[id].content = update
    return this.messages[id]
  }
}
export default MessageApp
