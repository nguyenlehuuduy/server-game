const curdHelper = require('../../helpers/crud')
const mongoose = require('mongoose');
const ImageModel = require('../../models/ImageModel');
class ImageServices {
    async CHECK_VALID_ID(ID, functionCheck) {
        if (mongoose.Types.ObjectId.isValid(ID)) {
            console.log(ID);
            let check_valid_id = await functionCheck(false, ID);
            if (!check_valid_id) {
                ID = null
                console.log('id is not valid')
                return null;
            } else {
                console.log('id is valid')
                return ID;
            }
        } else {
            console.log('id is not true')
            return null;
        }
    }

    //services get all Topic
    async getAllImage(req, res, next) {
        try {
            if (req) {
                let data = await curdHelper.getAll({
                    model: 'image',
                    query: req.query,
                })
                data = data.map(data => data.toObject());
                return data;
            }
        } catch (error) {
            return error;
        }
    }

    async getImageById(req, res, next) {
        try {
            let idImage;
            if (mongoose.Types.ObjectId.isValid(req.params.id)) {
                idImage = req.params.id;
            } else {
                return {
                    status: 'id is not valid',
                    obj: data
                }
            }
            if (req) {
                console.log(req.params.id)
                let data = await curdHelper.getSingle({
                    model: 'image',
                    query: req.query,
                    id: idImage,
                })
                return {
                    status: "successfully",
                    obj: data
                };
            }
        } catch (error) {
            return error;
        }
    }

    async addNewImage(req, res, next) {
        try {
            if (req) {
                let new_obj = {
                    image1: req.body.image1 || null,
                    image2: req.body.image2 || null,
                    image3: req.body.image3 || null,
                }
                let data = await curdHelper.create({
                    model: 'image',
                    obj: new_obj
                });
                return {
                    data: data,
                    obj: new_obj
                }
            }
        } catch (error) {
            return error;
        }
    }

    // Update Image
    async updateImage(request) {
        if (request) {
            try {
                let data = await curdHelper.update({
                    model: 'image',
                    id: request.body._id,
                    obj: request.body.obj
                });
                return {
                    data: data,
                    obj: request.body.obj
                };
            } catch (error) {
                console.log(error)
                return 'error';
            }
        }
    }

    // Service delete image
    async deleteImage(request){
        if(request){
            try{
                if(mongoose.Types.ObjectId.isValid(request.params.id)){
                    ImageModel.deleteOne(
                        {"_id": request.params.id}
                    ).then(() =>{

                    })
                    return "success"
                }else{
                    return {
                        status: "error",
                        data: "null"
                    }
                }
            }catch(error){
                console.log(error)
                return "error";
            }
        }
    }

    
}

module.exports = new ImageServices();