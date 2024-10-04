const curdHelper = require('../../helpers/crud');
const mongoose = require('mongoose');
const ReportModel = require('../../models/ReportModel');

class ReportServices{
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
    // Service get report
    async getAllReport(req, res, next) {
        try {
            if (req) {
                let data = await curdHelper.getAll({
                    model: 'report',
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

     //Get report by id
     async getReportbyID(req, res, next) {
        try {
            let idReport;
            if (mongoose.Types.ObjectId.isValid(req.params.id)) {
                idReport = req.params.id
            } else {
                return {
                    status: "id is not valid",
                    obj: data
                };
            }
            if (req) {
                console.log(req.params.id)
                let data = await curdHelper.getSingle({
                    model: 'report',
                    query: req.query,
                    id: idReport,
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
    //Add report by id
    async addNewReport(req, res, next) {
        try {
            if (req) {
                let idUser = await this.CHECK_VALID_ID(req.body.idUser, this.getDetailUserById)

                let new_obj = {
                    //struct of question model
                    reportcontent: req.body.reportcontent || null,
                    idUser: idUser || null
                }
                let data = await curdHelper.create({
                    model: 'report',
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

      //service get detail one report
      async getDetailUserById(request, pr_idUser) {
        if (request || pr_idUser) {
            let idUser = pr_idUser || request.params.idUser
            try {
                let data = await curdHelper.getSingle({
                    model: 'user',
                    id: idUser,
                });
                return idUser;

            } catch (error) {
                console.log(error)
                return 'error';
            }
        }

    }

     //service delete one question
     async deleteReport(request) {
        if (request) {
            try {
                if (mongoose.Types.ObjectId.isValid(request.params.id)) {
                    ReportModel.deleteOne(
                        { "_id": request.params.id }
                    ).then(() => {
                    })
                    return "success"
                } else {
                    return {
                        status: "error",
                        data: null
                    }
                }

            } catch (error) {
                console.log(error)
                return 'error';
            }
        }
    }

}


module.exports = new ReportServices();
