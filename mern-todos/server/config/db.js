const mongoose = require("mongoose")

const { MONGODB_USERNAME = "", MONGODB_PASSWORD = "", MONGODB_NAME = "" } = process.env

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.6cosilz.mongodb.net/?appName=Cluster0`,
            { dbName: MONGODB_NAME }
        );
        console.log("You successfully connected to MongoDB!");
        return mongoose;
    } catch (err) {
        console.dir(err);
    }
}

// Call this only when your application terminates
const disconnectFromMongoDB = async () => {
    await mongoose.connection.close();
}

module.exports = { connectToMongoDB, disconnectFromMongoDB }
