import mongoose from 'mongoose';

let MessageSchema = mongoose.Schema({
    content: String,
    date: { type: Date, default: Date.now },
});
let MessageModel = mongoose.model('messages', MessageSchema);

export default MessageModel;
