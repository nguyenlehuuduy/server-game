const curdHelper = require('../../helpers/crud')
const mongoose = require('mongoose');
const TopicModel = require('../../models/TopicModel');
const QuestionModel = require('../../models/QuestionModel');
class TopicServices {
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
    async getAllTopic(req, res, next) {
        try {
            if (req) {
                let data = await curdHelper.getAll({
                    model: 'topic',
                    query: req.query,
                    populate: [{ path: 'idRound', strictPopulate: false }],
                })
                data = data.map(data => data.toObject());
                return data;
            }
        } catch (error) {
            return error;
        }
    }

    async getTopicById(req, res, next) {
        try {
            let idTopic;
            if (mongoose.Types.ObjectId.isValid(req.params.id)) {
                idTopic = req.params.id;
            } else {
                return {
                    status: 'id is not valid',
                    obj: data
                }
            }
            if (req) {
                console.log(req.params.id)
                let data = await curdHelper.getSingle({
                    model: 'topic',
                    query: req.query,
                    id: idTopic,
                    populate: [{ path: 'idRound', strictPopulate: false }],
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

    async addNewTopic(req, res, next) {
        try {
            if (req) {
                let idRound = await this.CHECK_VALID_ID(req.body.idRound, this.getDetailRoundById)
                let new_obj = {
                    nameTopic: req.body.nameTopic || null,
                    descriptionTopic: req.body.descriptionTopic || null,
                    idRound: idRound || null,
                }
                let data = await curdHelper.create({
                    model: 'topic',
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

    // Update Topic
    async updateTopic(request) {
        if (request) {
            try {
                let data = await curdHelper.update({
                    model: 'topic',
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

    // Services delete topic id

    async deleteTopic(request) {
        if (request) {
            try {
                if (mongoose.Types.ObjectId.isValid(request.params.id)) {
                    const questionsCount = await QuestionModel.countDocuments({idTopic :request.params.id});
                    if(questionsCount > 0) {
                        return {
                            status: 'error',
                            data: "Không thể xóa chủ đề này vì có câu hỏi đang được sử dụng! "
                        };
                    }
                    else{
                      await TopicModel.deleteOne({"_id":request.params.id})  ;
                      return "success" ;
                    }
                } 
                else{
                    return {
                        status: "error",
                        data: "null"
                    }
                }
            }
            catch (error) {
                console.log(error)
                return 'error';
            }

        }
    }

    async getDetailRoundById(request, pr_idRound) {
        console.log('detail-roud', pr_idRound);
        if (request || pr_idRound) {
            let idRound = pr_idRound || request.params.idRound
            try {
                let data = await curdHelper.getSingle({
                    model: 'round',
                    id: idRound,
                });
                console.log('dâd', data);
                return data;
            } catch (error) {
                console.log(error);
                return error;
            }
        }
    }
}

module.exports = new TopicServices();