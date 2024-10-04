const TypeQuestionServices = require('../../../services/admin/TypeQuestionServices')


class TypeQuestionController{
    
//Controller get all type-questions

    async getAllTypeQuestion(request,response,next){
        try{
            if(request){
                let rs = await TypeQuestionServices.getAllTypeQuestion(request,response,next);
                if(rs){
                    response.json(rs)
                }
            }
        }catch(error){
            console.log(error)
        }
    }

// Controller get type-question by Id

    async getTypeQuestionByID(request,response,next){
        try {
            if(request){
                let rs = await TypeQuestionServices.getTypeQuestionbyID(request,response,next);
                response.json(rs);
            }
        } catch (error) {
            console.log(error)
        }
    }

// Controller add new type-question

    async addNewTypeQuestion(request,response,next){
        try {
            if(request){
                let rs = await TypeQuestionServices.addNewTypeQuestion(request,response,next);
                if(rs.data == "success"){
                    response.json(rs); 
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    //Controller update type-question
    async updateRTypeQuestion(request, response, next) {
        try {
            if (request) {
                let rs = await TypeQuestionServices.updateTypeQuestion(request, response, next);
                if (rs.data == "success") {
                    response.json(rs);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    //Controller delete type-question by ID

    async deleteTypeQuestion(request, response, next) {
        try {
            if (request) {
                let rs = await TypeQuestionServices.deleteTypeQuestion(request, response, next);
                response.json(rs);

            }
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = new TypeQuestionController();