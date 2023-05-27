const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/fypms');
    console.log("MongoDB Connection Successful...");

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/fypms').then((err) => {
//     if (!err) {
//         console.log("MongoDB Connection Successful...");
//     }
//     else {
//         console.log("Error in DB Connection: " + JSON.stringify(err, undefined, 2))
//     }
// });
module.exports = mongoose;