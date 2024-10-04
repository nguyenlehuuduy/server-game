// Model
const mongoose = require("mongoose");
const models = [
  "account",
  "question",
  "type-question",
  "topic",
  "round",
  "user",
  "image",
  "report",
];

class CurdHelper {
  async getAll({
    model = "",
    query = {},
    populate = [{ path: " ", strictPopulate: false }],
  }) {
    try {
      if (!model) {
        return null;
      }
      return setupModel(model).find(query).populate(populate);
    } catch (error) {
      console.log(error);
    }
  }
  // getAll(params) {
  //      params = Object.assign(
  //           {
  //                where: null,
  //                limit: null,
  //                page: 1,
  //                sort: { _id: -1 },
  //                select: null,
  //                isLean: true,
  //                populate: ''
  //           },
  //           params
  //      );
  //      const limit = parseInt(params.limit) || null;
  //      const page = parseInt(params.page || 1);
  //      const skip = limit && page ? (limit * page) - limit : 0;
  //      return this
  //           .find(params.where)
  //           .limit(limit)
  //           .skip(skip)

  //           .sort(params.sort)
  //           .select(params.select)
  //           .lean(params.isLean)
  //           .populate(params.populate)
  // }

  async getSingle({
    model = "",
    id = "",
    populate = [{ path: " ", strictPopulate: false }],
  }) {
    try {
      if (!model || !id) {
        return null;
      }
      return await setupModel(model).findById(id).populate(populate);
    } catch (error) {
      console.log(error);
    }
  }

  async create({ model = "", obj = "" }) {
    try {
      if (!model || !obj) {
        return null;
      }

      obj._id = new mongoose.Types.ObjectId();
      const objCreate = new setupModel(model)(obj);
      await objCreate.save();

      return "success";
    } catch (error) {
      console.log(error);
    }
  }

  async update({ model = "", id = "", obj = "" }) {
    try {
      if (!model || !id || !obj) {
        return null;
      }

      const objUpdate = await setupModel(model).findById(id);
      console.log("123", model);
      await objUpdate.updateOne(obj);

      return "success";
    } catch (error) {
      console.log(error);
    }
  }
}

function setupModel(model) {
  if (models.includes(model)) {
    switch (model) {
      case "account":
        return require("../models/AccountModel");
      case "question":
        return require("../models/QuestionModel");
      case "type-question":
        return require("../models/TypeQuestionModel");
      case "topic":
        return require("../models/TopicModel");
      case "round":
        return require("../models/RoundModel");
      case "user":
        return require("../models/UserModel");
      case "image":
        return require("../models/ImageModel");
      case "report":
        return require("../models/ReportModel");
      default:
        return null;
    }
  }
}

module.exports = new CurdHelper();
