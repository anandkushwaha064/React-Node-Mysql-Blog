const Posts = require('../models/postmodel');
const imgUpload = require('./Uploadimg');
const path = require('path');
const multer = require('multer');
const {time} = require('console');
const dbconnnectivity = require('../dbconnection');
var formidable = require('formidable');

exports.uploadPost = async (req, res) => {
  const postId = req.params.postId;
  const {imagepath, posttitle, story} = req.body;
  // console.log(imagepath, posttitle, story);
  const userid = 'Anand213';
  const imageid = userid + '_' + Date.now();
  sql = `insert into posts (userid,postid,posttitle,posttext,imageurl) values('${userid}','${imageid}','${posttitle}','${story}','${imagepath}')`;
  dbconnnectivity.query(sql, function (err, result) {
    if (err) response.status(500).send({error: 'Something Worng'});
    res.json({result: result});
  });
};

// imgUpload.uploadImage()
{
  // console.log(req.body.imagepath);
  // console.log(req.body.story);
  // console.log(req.body.posttitle);
  //   var form = new formidable.IncomingForm();
  //   form.parse(req, function (err, fields, files) {
  //     if (err) res.end(err);
  //     res.write('File uploaded');
  //     res.end();
  //   });
  // };
  // imgUpload.uploadImage(req.body.imagepath);
  // var upload = multer({ dest: "Upload_folder_name" })
  // If you do not want to use diskStorage then uncomment it
  // var storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, 'uploads');
  //   },
  //   filename: function (req, file, cb) {
  //     cb(null, file.fieldname + '-' + Date.now() + '.jpg');
  //   },
  // });
  // // Define the maximum size for uploading
  // // picture i.e. 1 MB. it is optional
  // const maxSize = 1 * 1000 * 1000;
  // var upload = multer({
  //   storage: storage,
  //   limits: {fileSize: maxSize},
  //   fileFilter: function (req, file, cb) {
  //     var filetypes = /jpeg|jpg|png/;
  //     var mimetype = filetypes.test(file.mimetype);
  //     var extname = filetypes.test(
  //       path.extname(file.originalname).toLowerCase()
  //     );
  //     if (mimetype && extname) {
  //       return cb(null, true);
  //     }
  //     cb(
  //       'Error: File upload only supports the ' +
  //         'following filetypes - ' +
  //         filetypes
  //     );
  //   },
  // }).single('mypic');
  // upload(req.body.imagepath, res, function (err) {
  //   if (err) {
  //     res.send(err);
  //   } else {
  //     res.send('Success, Image uploaded!');
  //   }
  // });
}
