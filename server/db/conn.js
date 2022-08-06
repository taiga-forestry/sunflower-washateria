const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var database;

module.exports = {
    connectToServer: (callback) => {
        client.connect((err, db) => {
            if (db) {
                database = db.db("sunflower");
            }
            return callback(err);
        });
    },
    
    getDb: () => {
        return database;
    }
}