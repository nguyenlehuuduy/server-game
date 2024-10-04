const curdHelper = require("../../helpers/crud");
const mongoose = require("mongoose");
const QuestionModel = require("../../models/QuestionModel");
class QuestionServices {
  //FUCNTION TO CHECK VALID ID
  async CHECK_VALID_ID(ID, functionCheck) {
    if (mongoose.Types.ObjectId.isValid(ID)) {
      let check_valid_id = await functionCheck(false, ID);
      if (!check_valid_id) {
        ID = null;
        console.log("id is not valid");
        return null;
      } else {
        return ID;
      }
    } else {
      return null;
    }
  }

  //service get all question
  async getAllQuestion(req, res, next) {
    try {
      if (req) {
        let data = await curdHelper.getAll({
          model: "question",
          query: req.query,
          populate: [
            { path: "idType", strictPopulate: false },
            { path: "idTopic", strictPopulate: false },
            { path: "idRound", strictPopulate: false },
          ],
        });
        data = data.map((data) => data.toObject());
        return data;
      }
    } catch (error) {
      return error;
    }
  }
  //service get a question by id
  async getQuestionById(req, res, next) {
    try {
      let idQuestion;
      if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        idQuestion = req.params.id;
      } else {
        return {
          status: "id is not valid",
          obj: data,
        };
      }
      if (req) {
        let data = await curdHelper.getSingle({
          model: "question",
          query: req.query,
          id: idQuestion,
          populate: [
            { path: "idType", strictPopulate: false },
            { path: "idTopic", strictPopulate: false },
            { path: "idRound", strictPopulate: false },
          ],
        });

        return {
          status: "successfully",
          obj: data,
        };
      }
    } catch (error) {
      return error;
    }
  }

  //service add new question
  async addNewQuestion(req, res, next) {
    try {
      if (req) {
        let idType = await this.CHECK_VALID_ID(
          req.body.idType,
          this.getDetailTypeQuestionById
        );
        let idTopic = await this.CHECK_VALID_ID(
          req.body.idTopic,
          this.getDetailTopicById
        );
        let idRound = await this.CHECK_VALID_ID(
          req.body.idRound,
          this.getDetailRoundById
        );

        let new_obj = {
          //struct of question model
          content: {
            decription: req.body.decription || null,
            imagePath: req.body.imagePath || null,
          },
          answer: req.body.answer || null,
          //array
          option: req.body.st_option || null,
          idType: idType || null,
          idTopic: idTopic || null,
          idRound: idRound || null,
        };
        let data = await curdHelper.create({
          model: "question",
          obj: new_obj,
        });
        return {
          data: data,
          obj: new_obj,
        };
      }
    } catch (error) {
      return error;
    }
  }

  //service update one question
  async updateQuestion(request) {
    if (request) {
      try {
        console.log(request.body._id);
        let data = await curdHelper.update({
          model: "question",
          id: request.body._id,
          obj: request.body.obj,
        });
        return {
          data: data,
          obj: request.body.obj,
        };
      } catch (error) {
        console.log(error);
        return "error";
      }
    }
  }

  //update question by ID
  // service update a question by ID
  // service update a question by ID
  async updateQuestionById(req, res, next) {
    try {
      // Check if the request has a valid question ID
      const idQuestion = await this.CHECK_VALID_ID(
        req.params.id,
        this.getDetailQuestionById
      );

      if (!idQuestion) {
        return {
          status: "ID is not valid",
          obj: null,
        };
      }

      // Prepare the update object based on the request body
      const updateObj = {
        // Update fields as needed, e.g., content, answer, option, idType, idTopic
        content: {
          decription: req.body.decription || null,
          imagePath: req.body.imagePath || null,
        },
        answer: req.body.answer || null,
        option: req.body.st_option || null,
        idType: req.body.idType || null,
        idTopic: req.body.idTopic || null,
      };

      // Perform the update operation
      const data = await curdHelper.update({
        model: "question",
        id: idQuestion,
        obj: updateObj,
      });

      return {
        status: "successfully",
        obj: data,
      };
    } catch (error) {
      return error;
    }
  }

  //service delete one question
  async deleteQuestion(request) {
    if (request) {
      try {
        if (mongoose.Types.ObjectId.isValid(request.params.id)) {
          QuestionModel.deleteOne({ _id: request.params.id }).then(() => {});
          return "success";
        } else {
          return {
            status: "error",
            data: null,
          };
        }
      } catch (error) {
        console.log(error);
        return "error";
      }
    }
  }

  //service get detail one question
  async getDetailTypeQuestionById(request, pr_idType) {
    if (request || pr_idType) {
      let idType = pr_idType || request.params.idType;
      try {
        let data = await curdHelper.getSingle({
          model: "type-question",
          id: idType,
        });
        return data;
      } catch (error) {
        console.log(error);
        return "error";
      }
    }
  }
  //service get detail one topic
  async getDetailTopicById(request, pr_idTopic) {
    if (request || pr_idTopic) {
      let idTopic = pr_idTopic || request.params.idTopic;

      try {
        let data = await curdHelper.getSingle({
          model: "topic",
          id: idTopic,
        });
        return data;
      } catch (error) {
        return "error";
      }
    }
  }

  //service get detail one round
  async getDetailRoundById(request, pr_idRound) {
    if (request || pr_idRound) {
      let idRound = pr_idRound || request.params.idRound;

      try {
        let data = await curdHelper.getSingle({
          model: "round",
          id: idRound,
        });
        return data;
      } catch (error) {
        return "error";
      }
    }
  }

  async getQuestionByRound(idRound) {
    try {
      if (idRound) {
        console.log(idRound);
        let rs = await QuestionModel.find({ idRound: idRound });
        return rs;
      }
    } catch (error) {
      console.log(error);
      return "error";
    }
  }
}
module.exports = new QuestionServices();
