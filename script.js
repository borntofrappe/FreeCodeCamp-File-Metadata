// set up an express app
const port = 3000;
const express = require('express');

const app = express();
// require multer
const multer = require('multer');
// set up the upload method from the multer package
// a single file will be uploaded
// the input element has a `type`of `file` and a `name` of `upfile`
const upload = multer().single('upfile');

// include the static files in the public folder
app.use(express.static(`${__dirname}/public`));
// send the HTML file in the root path of the application
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

// in the desired path, include the upload middleware
// this will allow the file to be detailed under `req.file`
app.post('/api/fileanalyse', upload, (req, res) => {
  // if a file is selected, `req.file` will **not** be undefined
  // instead, it'll be an object with the pertinent information
  if (req.file) {
    // destructure the pertinent information and return a JSON object
    const { originalname: name, mimetype: type, size } = req.file;
    res.json({
      name,
      type,
      size
    });
  } else {
    // if req.file is undefined, detail the occurrence
    res.json({
      errror: 'no file selected'
    });
  }
});

// listen on the selected port @local host
app.listen(port);
console.log(`Listening on port ${port}`);
