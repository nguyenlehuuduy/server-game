const curdHelper = require('../../helpers/crud')
const mongoose = require('mongoose')
const TypeQuestionModel = require('../../models/TypeQuestionModel')
const QuestionModel = require('../../models/QuestionModel')
class TypeQuestionServices {
    
    async CHECK_VALID_ID(ID,functionCheck){
        if(mongoose.Types.ObjectId.isValid(ID)){
            let check_valid_id = await functionCheck(false,ID);
            if(!check_valid_id){
                ID = null 
                console.log('id is not valid')
                return null;
            }else{
                return ID;
            }
        }else{
            return null;
        }
    }
    
    // Service get all type-question
    async getAllTypeQuestion(req, res, next) {
        try {
            if (req) {
                let data = await curdHelper.getAll({
                    model: 'type-question',
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

    // Service get type-question by ID
    async getTypeQuestionbyID(req, res, next) {
        try {
            let idType;
            if (mongoose.Types.ObjectId.isValid(req.params.id)) {
                idType = req.params.id
            } else {
                return {
                    status: "id is not valid",
                    obj: data
                };
            }
            if (req) {
                console.log(req.params.id)
                let data = await curdHelper.getSingle({
                    model: 'type-question',
                    query: req.query,
                    id: idType,
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
    //Service add new type questions
    async addNewTypeQuestion(req, res, next) {
        try {
            if (req) {
                let new_obj = {
                    nameType: req.body.nameType || null ,
                    descriptionType: req.body.descriptionType || null,
                }
                let data = await curdHelper.create({
                    model: 'type-question',
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
    // service update type-question

    async updateTypeQuestion(request) {
        if (request) {
            try {
                let data = await curdHelper.update({
                    model: 'type-question',
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
   
    // Service delete type-question
    // async deleteTypeQuestion(request){
    //     if(request){
    //         try{
    //             if(mongoose.Types.ObjectId.isValid(request.params.id)){
    //                 TypeQuestionModel.deleteOne(
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
    async deleteTypeQuestion(request) {
        if (request) {
            try {
                if (mongoose.Types.ObjectId.isValid(request.params.id)) {
                    // Kiểm tra xem có câu hỏi nào thuộc loại câu hỏi này không
                    const questionsCount = await QuestionModel.countDocuments({ idType: request.params.id });
    
                    if (questionsCount > 0) {
                        // Nếu có câu hỏi thuộc loại câu hỏi này, không cho xóa
                        return {
                            status: "error",
                            data: "Không thể xóa loại câu hỏi này vì có câu hỏi đang được sử dụng! ."
                        };
                    } else {
                        // Nếu không có câu hỏi nào, thì xóa loại câu hỏi
                        await TypeQuestionModel.deleteOne({ "_id": request.params.id });
                        return "success";
                    }
                } else {
                    return {
                        status: "error",
                        data: "null"
                    };
                }
            } catch (error) {
                console.log(error);
                return "error";
            }
        }
    }
    

}


module.exports = new TypeQuestionServices();