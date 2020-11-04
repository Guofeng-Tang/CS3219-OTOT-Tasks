let mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
let isConnected = false;

module.exports = getDB = () => {
    if (isConnected) {
        return Promise.resolve();
    } else {
        console.log("connecting to db")
        return mongoose.connect(uri, {useNewUrlParser: true}).then(() => isConnected = true);
    }
}
