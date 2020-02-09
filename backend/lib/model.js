import mongoose from 'mongoose';
let MessageSchema = mongoose.Schema({
  content: String,
  date: { type: Date, default: Date.now },
});

MessageSchema.post('validate', function(doc, next) {
  if (!doc.content){
    next('You can\'t post an empty message')
  };
  next()
});
MessageSchema.post('findOneAndUpdate', function(doc, next) {
  if (!doc){
    next('Message not found in database')
  };
  next()
});
MessageSchema.post('findOne', function(doc, next) {
  if (!doc){
    next('Message not found in database')
  };
  next()
});
MessageSchema.post('find', function(doc, next) {
  if (doc.length === 0){
    next('No messages in database')
  };
  next()
});
MessageSchema.post('deleteOne', function(doc, next) {
  if (doc.deletedCount === 0){
    next('Message not found in database')
  };
  next()
});


let MessageModel = mongoose.model('messages', MessageSchema);
export default MessageModel;
