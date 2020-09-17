const mongoose = require('mongoose')
const mongodbErrorHandler = require('mongoose-mongodb-errors')
const Schema = mongoose.Schema

const user = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  blogname: { type: String, required: true },
  password: { type: String, required: true },
})

user.plugin(mongodbErrorHandler)

module.exports = mongoose.model('Users', user)
