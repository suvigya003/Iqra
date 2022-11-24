require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const path  = require('path');

const db = require('./models');
db.sequelize.sync().then(() => {
    console.log('Database is synced');
}).catch((err) => {
    console.log(err);
}
);

// const multer = require('multer');
// const upload = multer({ storage: storage }).single("demo_image");

var corsOptions = {
    origin: "*",
  };

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors(corsOptions));

// var storage = multer.diskStorage({   
//     destination: function(req, file, cb) { 
//        cb(null, 'C:\Users\SUVIGYA\Desktop/images');    
//     }, 
//     filename:  (req, file, cb)=> { 
//        cb(null , Date.now()+ path.extname(file.originalname) );   
//     }
//  });

//  var upload = multer({ storage: storage }).single("demo_image");

// app.post("/upload",upload.single("file"), (req, res) => {
//     upload(req, res, (err) => {
//      if(err) {
//        res.status(400).send("Something went wrong!");
//      }
//      res.send(req.body);
//    });
//  });

require('./routes/routes.js')(app);
app.use(express.static(__dirname + "/public"));


app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

app.get('/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send('Hello World!');
}
);


PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}.`);
});