const fs = require('fs')
const path = require('path')

module.exports = async (db) => {
    try {
        let file = await fs.readFileSync(path.resolve(__dirname, 'contacts.json'));
        if(!file){
            return false
        }
        file = JSON.parse(file);
        let contacts = file.results
        let newContacts = []
        for(let contact of contacts){
            newContacts.push(new db.Contact(contact))
        }
        let res = await db.Contact.insertMany(newContacts)
        console.log(res)
    } catch (e) {
        console.log(e)
        throw e;
    }
}