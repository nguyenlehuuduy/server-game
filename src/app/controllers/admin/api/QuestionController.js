const QuestionServices = require("../../../services/admin/QuestionServices");

class QuestionController {
    async getAllQuestion(request, response, next) {
        try {
            if (request) {
                let rs = await QuestionServices.getAllQuestion(request, response, next);
                if (rs) {
                    response.json(rs);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    async getQuestionById(request, response, next) {
        try {
            if (request ) {
                let rs = await QuestionServices.getQuestionById(request, response, next);
                response.json(rs);

            }
        } catch (error) {
            console.log(error)
        }
    }

    async addNewQuestion(request, response, next) {
        try {
            if (request) {
                let rs = await QuestionServices.addNewQuestion(request, response, next);
                if (rs.data == "success") {
                    response.json(rs);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    async updateQuestion(request, response, next) {
        try {
            if (request) {
                let rs = await QuestionServices.updateQuestion(request, response, next);
                if (rs.data == "success") {
                    response.json(rs);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    async deleteQuestion(request, response, next) {
        try {
            if (request) {
                let rs = await QuestionServices.deleteQuestion(request, response, next);
                response.json(rs);

            }
        } catch (error) {
            console.log(error)
        }
    }

    async getQuestionByRound(request, response, next) {
        try {
            const idRound = request.params.id;
            console.log(idRound)
            if (request) {
                let rs = await QuestionServices.getQuestionByRound(idRound);
                response.json({
                    data: rs
                });

            }
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = new QuestionController;