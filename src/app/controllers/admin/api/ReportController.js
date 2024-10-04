const ReportServices = require("../../../services/admin/ReportServices");

class ReportController {
    async getAllReport(request, response, next) {
        try {
            if (request) {
                let rs = await ReportServices.getAllReport(request, response, next);
                if (rs) {
                    response.json(rs);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    async getReportById(request, response, next) {
        try {
            if (request ) {
                let rs = await ReportServices.getReportbyID(request, response, next);
                response.json(rs);

            }
        } catch (error) {
            console.log(error)
        }
    }

    async addNewReport(request, response, next) {
        try {
            if (request) {
                let rs = await ReportServices.addNewReport(request, response, next);
                if (rs.data == "success") {
                    response.json(rs);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    async deleteReport(request, response, next) {
        try {
            if (request) {
                let rs = await ReportServices.deleteReport(request, response, next);
                response.json(rs);

            }
        } catch (error) {
            console.log(error)
        }
    }

    
}
module.exports = new ReportController();