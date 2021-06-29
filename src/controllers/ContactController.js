const ContactService = require('../models/contacts/ContactService.js')

class ContactController {
    constructor(db) {
        this.db = db;
    }

    async getContactsList(filter) {
        try {
            return await ContactService(this.db).getContactsList(filter);
        } catch (e) {
            throw e;
        }
    }

    async deleteContact(contactId) {
        try {
            return await ContactService(this.db).deleteContact(contactId);
        } catch (e) {
            throw e;
        }
    }
}

module.exports = (db) => {
    return new ContactController(db);
};