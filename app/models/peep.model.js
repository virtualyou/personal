module.exports = (sequelize, Sequelize) => {
    return sequelize.define("peeps", {
        name: {
            type: Sequelize.STRING
        },
        phone1: {
            type: Sequelize.STRING
        },
        phone2: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        note: {
            type: Sequelize.STRING
        },
        userKey: {
            type: Sequelize.INTEGER
        }
    });
};
/*
    "name": "Bob Taylor",
    "email": "btaylor79@gmail.com",
    "phone1": "919-567-5499",
    "phone2": "456-122-8000",
    "address": "7823 Waters Lane, Miami, Florida, 23499",
    "note": "Close friend",
    "userKey": 10
 */