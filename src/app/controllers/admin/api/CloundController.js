const jwt = require("jsonwebtoken");
const AdminServies = require("../../../services/admin/AdminServies");
const CloundServices = require("../../../services/admin/CloundServices");
const formidable = require('formidable');
const path = require('path');
const sharp = require("sharp")
const fs = require('fs');

// Constants
class CloundController {
    //get all image
    async getAllImageClound(req, res, next) {
        const result = await CloundServices.getAllFileInFolder(req);
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        if (result != 'error') {
            res.json(result)
        } else {
            // console.log(res)
            console.log(result)
        }
    }
    //delete image
    async deleteFileDrive(request, response, next) {
        response.setHeader("Content-Type", "text/json");
        response.setHeader("Access-Control-Allow-Origin", "*");
        const res = await CloundServices.deleteFileDrive(request);
        if (res == 204) {
            response.json(res);
        } else {
            response.json('error');
        }
    }

    //add images
    async bulkUploadDesign(request, response, next) {
        // formdata = formidable({ multiples: true });
        var formdata = new formidable.IncomingForm();
        const uploadFolder = path.join(__dirname, "./uploads");
        formdata.uploadDir = uploadFolder;
        formdata.multiples = true;
        formdata.maxFileSize = 50 * 1024 * 1024; // 5MB
        formdata.keepExtensions = true;
        formdata.parse(request, async (err, fields, files) => {
            if (err) {
                console.log(err)
                return;
            }
            var arrOfFiles = []
            arrOfFiles = files.file;
            console.log(arrOfFiles)

            if (arrOfFiles.length) {
                console.log(arrOfFiles.length)
                await arrOfFiles.map((each) => {
                    console.log(each.filepath)
                    sharp(each.filepath)
                        .webp()
                        .toFile(__dirname + '/convert-upload/' + each.newFilename + '.webp')
                        .then(function (info) {
                            console.log(info)
                        }).then(async () => {
                            //name file upload
                            const res = await CloundServices.upLoadFileDrive(each.newFilename);
                            if (res) {
                                setTimeout(function () {
                                    fs.unlink(__dirname + '/convert-upload/' + res.namePhoto + '.webp', function (err) {
                                        if (err) throw err;
                                        console.log('File deleted!');
                                    });
                                }, 3000)

                                setTimeout(function () {
                                    fs.unlink(__dirname + '/uploads/' + res.namePhoto, function (err) {
                                        if (err) throw err;
                                        console.log('File deleted!');
                                    });
                                }, 3000)
                                return res;
                            }
                        })
                        .catch(function (err) {
                            console.log(err)
                        })

                });
                response.redirect('/admin/image');

            } else {
                console.log(files.file.filepath)
                sharp(files.file.filepath)
                    .webp()
                    .toFile(__dirname + '/convert-upload/' + files.file.newFilename + '.webp')
                    .then(function (info) {
                        console.log(info)
                    }).then(async () => {
                        const res = await CloundServices.upLoadFileDrive(files.file.newFilename);
                        if (res) {
                            setTimeout(function () {
                                console.log(__dirname);
                                fs.unlink(__dirname + '/convert-upload/' + res.namePhoto + '.webp', function (err) {
                                    if (err) throw err;
                                    console.log('File deleted!');
                                });
                            }, 3000)

                            setTimeout(function () {
                                fs.unlink(__dirname + '/uploads/' + res.namePhoto, function (err) {
                                    if (err) throw err;
                                    console.log('File deleted!');
                                });
                            }, 3000)
                            return res;
                        }
                    }).then((data) => {
                        if (data) {
                            response.redirect('/admin/image');
                        }
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
            }
        });

        // console.log('123', request.body);
        // response.setHeader("Content-Type", "text/json");
        // response.setHeader("Access-Control-Allow-Origin", "*");
        // response.json(request.body);
    }


}
module.exports = new CloundController();
