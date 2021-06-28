const mongoose = require('mongoose');
const CONNECTION_STRING = 'mongodb://localhost/namogoo';

mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.once('open', () => {
    console.log("db connected")
});
db.on('error', err => {
    console.log("db error", err);
});

// Export db schemas
module.exports = {
    Contact: require('../models/contacts/ContactModel'),
};