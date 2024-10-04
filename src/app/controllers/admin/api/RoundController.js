const RoundServices = require("../../../services/admin/RoundServices")

class RoundController {

    async getAllround(request,response,next){
        try{
            if(request){
                let rs = await RoundServices.getAllRound(request,response,next);
                if(rs){
                    response.json(rs)
                }
            }
        }catch(error){
            console.log(error)
        }
    }


    async getRoundID(request,response,next){
        try {
            if(request){
                let rs = await RoundServices.getRoundbyID(request,response,next);
                response.json(rs);
            }
        } catch (error) {
            console.log(error)
        }
    }

    async addNewRound(request,response,next){
        try {
            if(request){
                let rs = await RoundServices.addNewRound(request,response,next);
                if(rs.data == "success"){
                    response.json(rs); 
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    async updateRound(request, response, next) {
        try {
            if (request) {
                let rs = await RoundServices.updateRound(request, response, next);
                if (rs.data == "success") {
                    response.json(rs);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    async deleteRound(request, response, next) {
        try {
            if (request) {
                let rs = await RoundServices.deleteRound(request, response, next);
                response.json(rs);

            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new RoundController;