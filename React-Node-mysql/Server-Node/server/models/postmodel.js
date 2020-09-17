const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const Schema = mongoose.Schema;

const post = new Schema(
  {
    title: {type: String, required: true},
    text: {type: String, required: true},
  },
  {
    timestamps: true,
  }
);

post.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Posts', post);
