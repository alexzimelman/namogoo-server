const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

class ContactService {
    constructor(db) {
        this.db = db;
    }

    async getContactsList(name) {
        try {
            return await this.db.Contact.find({})
        } catch (e) {
            throw e;
        }
    }

    async deleteContact(contactId) {
        try {
            return await this.db.Contact.findByIdAndUpdate(contactId, {isActive: false}, {new: true});
        } catch (e) {
            throw e;
        }
    }

    async resetContacts() {
        try {
            await this.db.Contact.updateMany({isActive: false}, {isActive: true}, {new: true});
            return this.getContactsList()
        } catch (e) {
            throw e;
        }
    }

}

module.exports = (db) => {
    return new ContactService(db);
}