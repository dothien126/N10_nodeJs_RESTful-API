const mongoose = require('mongoose')

const {MONGO_URI, MONGO_URI_TEST, PORT, PORT_TEST} = require('./index')

const mongodbUri = process.env.NODE_ENV === 'test' ? MONGO_URI_TEST : MONGO_URI

// connect to mongodb
const connection = async () => {
    await mongoose
        .connect( MONGO_URI)
        .then(() => {
            console.log('✅ Connect to database successfully ... ');
        })
        .catch(() => {
            console.log('❌ Connect to database failed ... ');
        });
};

module.exports = connection
