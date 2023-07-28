const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  description: { type: String },
  location: { type: String },
  tags: { type: [String], required: true },
  type: { type: String, enum: ['photo', 'video'], required: true },
  mediaURL: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
