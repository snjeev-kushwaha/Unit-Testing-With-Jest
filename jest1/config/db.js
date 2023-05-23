const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URL).then((con) => {
        console.log("database connected", con.connection.host)
    })
}

module.exports = { connectDB }