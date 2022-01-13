var express = require('express');
var router = express.Router();
var formidable = require('formidable');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/upload", (req, res) => {

  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ files });
  });

  // form.parse(req, function (err, fields, files) {
  //   console.log(fields.gradeNumber);
  //   const oldpath = files.filetoupload.path;
  //   const newpath = 'D:/www/dropbox-clone/upload' + files.filetoupload.name;

  //   fs.rename(oldpath, newpath, function (err) {
  //     if (err) throw err;
  //     res.write('File uploaded and moved!');
  //     res.end();
  //   });

  // });
});

module.exports = router;
