let mongoose = require('mongoose');

// const uri = process.env.MONGODB_URI;
const uri = "mongodb+srv://dbAdmin:b7JpARH3m72ELDX@cluster-cs3219-task-b.xr0ak.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority"
let isConnected = false;

module.exports = getDB = () => {
    if (isConnected) {
        return Promise.resolve();
    } else {
        console.log("connecting to db")
        return mongoose.connect(uri, {useNewUrlParser: true}).then(() => isConnected = true);
    }
}
