const mongoose = require('mongoose');

async function connectToMongoDb(url) {
    return mongoose.connect(url)
    .then(() => console.log("Mongo db connected"))
    .catch((err)=>console.error("error", err));
}

module.exports = {connectToMongoDb,};