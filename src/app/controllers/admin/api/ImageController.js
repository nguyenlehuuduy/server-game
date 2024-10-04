const ImageServices = require('../../../services/admin/ImageServices');

class ImageController {
    //get All Image Contorller
    async getAllImage(request, response, next) {
        try {
            if (request) {
                let rs = await ImageServices.getAllImage(request, response, next);
                if (rs) {
                    response.json(rs);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    //get Image by Id Contorller

    async getImageByID(request, response, next) {
        try {
            if (request ) {
                let rs = await ImageServices.getImageById(request, response, next);
                response.json(rs);

            }
        } catch (error) {
            console.log(error)
        }
    }
    // add user controller
    async addNewImage(request, response, next) {
        try {
            if (request) {
                let rs = await ImageServices.addNewImage(request, response, next);
                if (rs.data == "success") {
                    response.json(rs);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    //update user controller 
    async updateImage(request, response, next) {
        try {
            if (request) {
                let rs = await ImageServices.updateImage(request, response, next);
                if (rs.data == "success") {
                    response.json(rs);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    // delete user
    async deleteImage(request, response, next) {
        try {
            if (request) {
                let rs = await ImageServices.deleteImage(request, response, next);
                response.json(rs);

            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new ImageController();