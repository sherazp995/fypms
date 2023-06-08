const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.mongoURL);
    console.log("MongoDB Connection Successful...");
}

module.exports = mongoose;