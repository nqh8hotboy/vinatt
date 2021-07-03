var express    = require('express');
var router = express.Router();
var core=require('./core');
var fs = require('fs-extra');
var formidable = require('formidable');

router.post('/',function (req, res) {
    var form = new formidable.IncomingForm();
    //Formidable uploads to operating systems tmp dir by default
    form.uploadDir = "./public/image_upload";
    //set upload directory
    form.keepExtensions = true;     //keep file extension
    form.parse(req, function(err, fields, files) {
        // console.log(files);
        // console.log("form.bytesReceived");
        // //TESTING
        // console.log("file size: "+JSON.stringify(files.fileUploaded.size));
        // console.log("file path: "+JSON.stringify(files.fileUploaded.path));
        // console.log("file name: "+JSON.stringify(files.fileUploaded.name));
        // console.log("file type: "+JSON.stringify(files.fileUploaded.type));
        // console.log("astModifiedDate: "+JSON.stringify(files.fileUploaded.lastModifiedDate));
        var datenow=Date.now();
        var path="./public/image_upload/img_"+datenow;
        var url="image_upload/img_"+datenow;
        if(files.file !=undefined) {
            fs.rename(files.file.path, path, function (err) {
                if (err) {
                    res.send(core.error(err.message));
                    console.log(err);
                    return;
                }

                res.send(core.success({url: url,name:files.file.name}));
            });
        }
    });
});
module.exports=router;