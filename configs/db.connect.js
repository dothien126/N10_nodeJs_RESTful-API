const mongoose = require('mongoose')

const {MONGO_URI} = require('./index')

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
