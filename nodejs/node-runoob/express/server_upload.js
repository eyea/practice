var express = require('express');
var app = express();
var fs = require('fs');

var bodyParser = require('body-parser');
var multer = require('multer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({dest: '/tmp/'}).array('image'));

app.get('/file_upload.html', function(req, res){
 res.sendFile(__dirname+ '/' + 'file_upload.html');
});

app.post('/file_upload', function(req, res){
 console.log(req.files[0]);  // 上传的文件信息

 var des_file = __dirname + '/' + req.files[0].oroginalname;
 fs.readFile(req.files[0].path, function(err, data){
  fs.writeFile(des_file, data, function(err){
   if(err){
     console.log(err)
    }else{
     response= {
      message: 'File uploaded successfully',
      filename: req.files[0].originalname
     }
}    console.log(response);
    res.end(JSON.stringify(response))
    })
  })
 })

var server = app.listen(8081, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('running now !')
})




