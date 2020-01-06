const env = process.env.NODE_ENV || 'development';

const port = process.env.PORT || 5000
const express = require('express');
const app = express();
const multer = require('multer');
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build")));
require("dotenv").config();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
var upload = multer({ storage: storage }).single('file');

app.post('/upload', function (req, res) {

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)

    })

});

require('./src/configuration/database')(config);
require('./src/configuration/express')(app);
require('./src/configuration/routes')(app);
require('./src/configuration/passport')();

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port);
console.log(`Application listening on port ${port}`);