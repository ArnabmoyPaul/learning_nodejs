const mongoose = require('mongoose');

// Define the mongoDb connection URL

const mongoURL = 'mongodb://127.0.0.1:27017/hotel'

//Replace "mydatabase with your database name (like hotel school etc"

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})

const db = mongoose.connection;

//Define event listeners for database cannection

db.on('connected',() => {
    console.log('Connectedto MongoDB server');
});
db.on('error',(err) => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
});

//Export the database connection 

module.exports = db;