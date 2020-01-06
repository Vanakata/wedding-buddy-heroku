const path = require('path');
const rootPath = path.normalize(path.join(__dirname, '/../'));
module.exports = {
    development: {
        rootPath,
        dbPath: process.env.MONGODB_URI || 'mongodb://localhost:27017/MyWeddingSite',
        port: process.env.PORT || 5000,
    },
    production: {},

}
