const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

class ContactService {
    constructor(db) {
        this.db = db;
    }

    async getContactsList(filter) {
        try {
            let query = []
            let queryProject = {
                $project: {
                    _id: 1,
                    gender: 1,
                    name: 1,
                    email: 1,
                    phone: 1,
                    cell: 1,
                    picture: 1,
                    lowerCaseFirstName:{ "$toLower": "$name.first" }
                }
            }
            let querySort = {
                $sort: {"lowerCaseFirstName": 1}
            }
            query.push(queryProject)
            if(filter.filter){
                query.push({
                    $match: {
                        $or: [
                            {
                                "name.first": {"$regex": filter.filter, "$options": "i"}
                            },
                            {
                                "name.last": {"$regex": filter.filter, "$options": "i"}
                            },
                            {
                                "cell": {"$regex": filter.filter, "$options": "i"}
                            },
                            {
                                "phone": {"$regex": filter.filter, "$options": "i"}
                            },
                            {
                                "email": {"$regex": filter.filter, "$options": "i"}
                            }
                        ]
                    }
                })
            }
            query.push(querySort)
            return await this.db.Contact.aggregate(query)
        } catch (e) {
            throw e;
        }
    }

    async deleteContact(contactId) {
        try {
            return await this.db.Contact.findByIdAndRemove(contactId);
        } catch (e) {
            throw e;
        }
    }
}

module.exports = (db) => {
    return new ContactService(db);
}