const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ContactsSchema = new Schema({
    createdAt: {type: Date, default: Date.now()},
    isActive: {type: Boolean, default: true},
    gender: String,
    name: {
        title: String,
        first: String,
        last: String
    },
    email: String,
    phone: String,
    cell: String,
    picture: {
        large: String,
        medium: String,
        thumbnail: String,
    }
})

module.exports = mongoose.model('Contacts', ContactsSchema);