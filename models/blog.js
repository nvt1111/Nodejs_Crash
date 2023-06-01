const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
},{timestamps: true}) //Tùy chọn này { timestamps: true }được sử dụng trong Mongoose để tự động thêm createdAtvà updatedAtcác trường vào tài liệu MongoDB của bạn.

const Blog = mongoose.model('Blog', blogSchema)
module.exports= Blog
