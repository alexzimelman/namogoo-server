const ContactService = require('../models/contacts/ContactService.js')

class ContactController {
    constructor(db) {
        this.db = db;
    }

    async getContactsList(name) {
        try {
            return await ContactService(this.db).getContactsList(name);
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

    async resetContacts() {
        try {
            return await ContactService(this.db).resetContacts();
        } catch (e) {
            throw e;
        }
    }

}

module.exports = (db) => {
    return new ContactController(db);
};