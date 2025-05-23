const mongodb = require('../data/database');

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tag=['Contacts']
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tag=['Contacts']
    const contactId = new ObjectId(req.params.id);
    console.log(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: contactId });
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
};

const createUser = async (req, res) => {
    //#swagger.tag=['Contacts']
    const contact = {
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        email: req.body.email,
        favoritecolor: req.body.favoriteColor,
        birthday: req.body.birthday,
    };
    const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error occured while updating user');
    }
}

const updateUser = async (req, res) => {
    //#swagger.tag=['Contacts']
    const contactId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
    };

    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({ _id: contactId}, contact);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error occured while updating user');
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tag=['Contacts']
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: contactId});
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Error occured while deletinguser');
        }

}

module.exports = {
    getAll, getSingle, createUser, updateUser, deleteUser
}