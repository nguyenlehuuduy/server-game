const curdHelper = require('../../helpers/crud');
const mongoose = require('mongoose');
const RoundModel = require('../../models/RoundModel');
const TopicModel = require('../../models/TopicModel');

class RoundServices{

    // Function check Valid ID
    async CHECK_VALID_ID(ID, functionCheck) {
        if (mongoose.Types.ObjectId.isValid(ID)) {
            let check_valid_id = await functionCheck(false, ID);
            if (!check_valid_id) {
                ID = null
                console.log('id is not valid')
                return null;
            } else {
                return ID;
            }
        } else {
            return null;
        }
    }
    // Service get round
    async getAllRound(req, res, next) {
        try {
            if (req) {
                let data = await curdHelper.getAll({
                    model: 'round',
                    query: req.query,
                    // populate: [{ path: 'category', strictPopulate: false }],
                })
                data = data.map(data => data.toObject());
                return data;
            }
        } catch (error) {
            return error;
        }
    }
    //Get question by id
    async getRoundbyID(req, res, next) {
        try {
            let idRound;
            if (mongoose.Types.ObjectId.isValid(req.params.id)) {
                idRound = req.params.id
            } else {
                return {
                    status: "id is not valid",
                    obj: data
                };
            }
            if (req) {
                console.log(req.params.id)
                let data = await curdHelper.getSingle({
                    model: 'round',
                    query: req.query,
                    id: idRound,
                    // populate: [{ path: 'category', strictPopulate: false }],
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
    //function add new round
    async addNewRound(req, res, next) {
        try {
            if (req) {
                let new_obj = {
                    nameRound: req.body.nameRound || null ,
                    descriptionRound: req.body.descriptionRound || null,
                    conditionWinning: req.body.conditionWinning || null ,
                    conditionlevel: req.body.conditionlevel || null,
                }
                
                let data = await curdHelper.create({
                    model: 'round',
                    obj: new_obj
                });
                return {
                    data: data,
                    obj: new_obj
                };
            }
        } catch (error) {
            return error;
        }
    }

// function update round
    async updateRound(request) {
        if (request) {
            try {
                let data = await curdHelper.update({
                    model: 'round',
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

    // Services delete one round

    // async deleteRound(request){
    //     if(request){
    //         try{
    //             if(mongoose.Types.ObjectId.isValid(request.params.id)){
    //                 RoundModel.deleteOne(
    //                     {"_id": request.params.id}
    //                 ).then(() =>{

    //                 })
    //                 return "success"
    //             }else{
    //                 return {
    //                     status: "error",
    //                     data: "null"
    //                 }
    //             }
    //         }catch(error){
    //             console.log(error)
    //             return "error";
    //         }
    //     }
    // }
    async deleteRound(request){
        if(request){
            try{
                if(mongoose.Types.ObjectId.isValid(request.params.id)){
                const topicsCount = await TopicModel.countDocuments({idRound: request.params.id})
                    if(topicsCount > 0) {
                        return {
                            status: "error",
                            data:"Không thể xóa vòng chơi này vì có một chủ đề đang được sử dụng"
                        }
                    }
                    else{
                        await RoundModel.deleteOne({"_id":request.params.id})
                        return "success"
                    }
                }else{
                    return {
                        status: "error",
                        data:"null"
                    }
                }
            }catch(error){
                console.log(error)
                return "error";
            }
        }
    }
}
module.exports = new RoundServices();