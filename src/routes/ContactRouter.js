const express = require('express');
const ContactRouter = express.Router();
const ContactsController = require('../controllers/ContactController');
const response = require('./response');
const DELETE_ERROR = 'Please pass contact id'

module.exports = (db) => {
    ContactRouter.get('/', (req, res) => {
        console.log("req.query", req.query)
        ContactsController(db).getContactsList()
            .then(list => {
                return response.success(res, list);
            })
            .catch(e => {
                return response.error(res, e);
            })
    })

    ContactRouter.delete('/:contactId', (req, res) => {
        if (!req.params.contactId) {
            return response.error(res, DELETE_ERROR);
        }
        ContactsController(db).deleteContact(req.params.contactId)
            .then(contact => {
                return response.success(res, contact);
            })
            .catch(e => {
                return response.error(res, e);
            })
    })

    ContactRouter.put('/reset', (req, res) => {
        ContactsController(db).resetContacts()
            .then(contact => {
                return response.success(res, contact);
            })
            .catch(e => {
                return response.error(res, e);
            })
    })

    return ContactRouter;
}