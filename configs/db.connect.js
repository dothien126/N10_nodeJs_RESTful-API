const mongoose = require('mongoose')

// connect to mongodb
const connection = async () => {
    await mongoose
        .connect('mongodb://localhost/nodeApi')
        .then(() => {
            console.log('✅ Connect to database successfully ... ');
        })
        .catch(() => {
            console.log('❌ Connect to database failed ... ');
        });
};

module.exports = connection
