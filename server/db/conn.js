const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/fypms');
    console.log("MongoDB Connection Successful...");
}

module.exports = mongoose;