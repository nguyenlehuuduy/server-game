const TopicServices = require('../../../services/admin/TopicServices');

class TopicController{
    // COntroller get all Topic 
    async getAllTopics(request,response,next){
        try{
            if(request){
                let rs = await TopicServices.getAllTopic(request,response,next)
                if(rs){
                    response.json(rs)
                }
            }
        }catch(error){
            console.log(error)
        }
    }

    // Controller get id topic\

    async getTopicID(request,response,next){
        try {
            if(request){
                let rs = await TopicServices.getTopicById(request)
                response.json(rs)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Controller add new Topic 

    async addNewTopic(request,response,next){
        try {
            if(request){
                let rs = await TopicServices.addNewTopic(request,response,next);
                if(rs.data == "success"){
                    response.json(rs); 
                }
            }
        } catch (error) {
            console.log(error)
        }
    }  

    //Controller update Topic

    async updateTopic(request,response,next){
        try{
            if(request){
                let rs = await TopicServices.updateTopic(request,response,next)
                if(rs.data == "success"){
                    response.json(rs)
                }
            }
        }catch(error){
            console.log(error)
        }
    }
    
    //Controller update Topic
    async deleteTopic(request,response,next){
        try {
            if(request){
                let rs = await TopicServices.deleteTopic(request,response,next);
                response.json(rs);
            }
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = new TopicController()