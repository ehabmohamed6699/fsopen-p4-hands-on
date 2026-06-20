const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    minLength: 6,
    maxLength: 100,
    required: true
  },
  author: {
    type: String,
    minLength: 6,
    maxLength: 100,
    required: true
  },
  url: {
    type: String,
    validate:{
        validator: (v) => {
          let template = new RegExp('^https?:\\/\\/(?:[\\w-]+\\.)+[\\w-]{2,}(?:[\\/?#][^\\s]*)?$')
          return template.test(v)
        },
        message: "Malformed url!"
    },
    required: true
  },
  likes: {
    type: Number,
    min: 0,
    default: 0
  },
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)