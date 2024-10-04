// Constants
const logger = require('../constants/loggerConstant');
const QuestionServices = require('../services/admin/QuestionServices');
const UserServices = require('../services/admin/UserServices');

class HomeController {
    async index(req, res, next) {
        res.status(200).json({
            question: [{
                question: "1 + 1 = ?",
                answer: "2"
            }, {
                question: "2 + 1 = ?",
                answer: "3"
            }
            ]
        })
    }
    async postText(req, res, next) {
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        if (req) {
            console.log(req.body);
            res.status(200).json(req.body);
        }
    }

    async questionInGame(req, res, next) {
        let JSON_RESPONSE = [];
        if (req.params.id) {
            //check id account
            let userById = await UserServices.getUserbyID(req, res, next);
            if (userById.status == 200) {
                //get all question
                let questions = await QuestionServices.getAllQuestion(req, res, next);
                if (questions) {
                    questions.map((question) => {
                        let json = {
                            questions: question._id,
                            type: {
                                typeId: question.idType._id,
                                typeName: question.idType.nameType
                            },
                            topic: {},
                            content: {
                                des: question.content.decription,
                                images: []
                            },
                            answer: question.answer,
                            option: question.option
                        }
                        JSON_RESPONSE.push(json);
                    });
                    res.json(JSON_RESPONSE);
                }
                // res.json(questions);
            } else {
                res.json(userById);
            }
        }
    }
}
module.exports = new HomeController();
