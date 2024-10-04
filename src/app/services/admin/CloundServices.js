const googleDriverHelper = require('../../helpers/googleApi');
const ID_FOLDER_DESIGN = process.env.ID_FOLDER_DESIGN;

class CloundServices {
    //services get all design from ggdrive
    async getAllFileInFolder(request, response, next) {
        try {
            if (request) {
                let data = await googleDriverHelper.listFiles(ID_FOLDER_DESIGN);
                return data;
            }
        } catch (error) {
            console.log(error)
            return 'error'
        }
    }

    //services delete file driver
    async deleteFileDrive(request) {
        if (request) {
            try {
                let data = await googleDriverHelper.deleteFile(request.body.fileId);
                return data;
            } catch (error) {
                return error;
            }
        }

    }

    async upLoadFileDrive(namePhoto) {
        try {
            let data = await googleDriverHelper.uploadFileDrive(ID_FOLDER_DESIGN, namePhoto);
            return { 'data': data, 'namePhoto': namePhoto };
        } catch (error) {
            return 'error';
        }

    }




}
module.exports = new CloundServices();