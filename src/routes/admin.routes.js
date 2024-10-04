const HomeController = require("../app/controllers/admin/view/HomeController");
const AuthController = require("../app/controllers/admin/api/AuthController");
const MiddleWareController = require("../app/middlewares/MiddlewareController");
const QuestionController = require("../app/controllers/admin/api/QuestionController");
const RoundController = require("../app/controllers/admin/api/RoundController");
const TopicController = require("../app/controllers/admin/api/TopicController");
const UserController = require("../app/controllers/admin/api/UserController");
const TypeQuestionController = require("../app/controllers/admin/api/TypeQuestionController");
const ImageController = require("../app/controllers/admin/api/ImageController");
const ReportController = require("../app/controllers/admin/api/ReportController");
const router = require("express").Router();

//API
//middle MiddleWareController.verifytoken ware check token in header
router.get("/get-all", MiddleWareController.verifytoken, (req, res, next) => {
  res.send("test json web token");
});
// --------------------------------------------------------------
// QUESTION
//GET all question
router.get(
  "/get-all-question",
  MiddleWareController.verifytoken,
  QuestionController.getAllQuestion
);
//GET one question
router.get(
  "/get-question/:id",
  MiddleWareController.verifytoken,
  QuestionController.getQuestionById
);
//POST a question
router.post(
  "/add-new-question",
  MiddleWareController.verifytoken,
  QuestionController.addNewQuestion
);
//UPDATE a question
router.put(
  "/update-question",
  MiddleWareController.verifytoken,
  QuestionController.updateQuestion
);
//Delete a question
router.delete(
  "/delete-question/:id",
  MiddleWareController.verifytoken,
  QuestionController.deleteQuestion
);
//GET question by round (Bao code , fix tạm ko validate)
router.get("/get-question-by-round/:id", QuestionController.getQuestionByRound);

// ---------------------------------------------------------------------------------------------

// ROUND
//GET all round
router.get(
  "/get-all-round",
  MiddleWareController.verifytoken,
  RoundController.getAllround
);
//GET Round by ID
router.get(
  "/get-round/:id",
  MiddleWareController.verifytoken,
  RoundController.getRoundID
);
//POST add new Round
router.post(
  "/add-new-round",
  MiddleWareController.verifytoken,
  RoundController.addNewRound
);
//PUT a round
router.put(
  "/update-round",
  MiddleWareController.verifytoken,
  RoundController.updateRound
);
//DELETE a round by ID
router.delete(
  "/delete-round/:id",
  MiddleWareController.verifytoken,
  RoundController.deleteRound
);

// ---------------------------------------------------------------------------------------------
// TOPIC
// GET All TOPIC
router.get(
  "/get-all-topic",
  MiddleWareController.verifytoken,
  TopicController.getAllTopics
);
//GET Topic by ID
router.get(
  "/get-topic/:id",
  MiddleWareController.verifytoken,
  TopicController.getTopicID
);
//POST Add new Topic
router.post(
  "/add-new-topic",
  MiddleWareController.verifytoken,
  TopicController.addNewTopic
);
//PUT Update topic
router.put(
  "/update-topic",
  MiddleWareController.verifytoken,
  TopicController.updateTopic
);
//DELETE Delete Topic
router.delete(
  "/delete-topic/:id",
  MiddleWareController.verifytoken,
  TopicController.deleteTopic
);
// ---------------------------------------------------------------------------------------------
// Type - Question
// GET all type questions
router.get(
  "/all-type-questions",
  MiddleWareController.verifytoken,
  TypeQuestionController.getAllTypeQuestion
);
//GET type-questions by Id
router.get(
  "/get-type-questions/:id",
  MiddleWareController.verifytoken,
  TypeQuestionController.getTypeQuestionByID
);
//POST type-questions
router.post(
  "/add-new-type-questions",
  MiddleWareController.verifytoken,
  TypeQuestionController.addNewTypeQuestion
);
//PUT Update type-questions
router.put(
  "/update-type-questions",
  MiddleWareController.verifytoken,
  TypeQuestionController.updateRTypeQuestion
);
//DELETE id type-questions
router.delete(
  "/delete-type-questions/:id",
  MiddleWareController.verifytoken,
  TypeQuestionController.deleteTypeQuestion
);

// ---------------------------------------------------------------------------------------------
//User

router.get("/all-user", UserController.getAllUser);
//GET type-questions by Id
router.get("/get-user/:id", UserController.getUserById);
//POST type-questions
router.post("/add-new-user", UserController.addNewUser);
//PUT Update type-questions
router.put("/update-user", UserController.updateUser);
//DELETE id type-questions
router.delete("/delete-user/:id", UserController.deleteUser);
// Check username user
router.post("/check-user", UserController.checkUser);
//check username and birth
router.post("/checkuserandbirth", UserController.checkusernameandbirth);
//update password
router.put("/updatepass", UserController.updatepass);
//check username and password for login
//update password
router.post("/checkusernandpass", UserController.checkusernameandpass);
//login
router.post("/login", UserController.loginUser);

// ---------------------------------------------------------------------------------------------

//Image

router.get("/all-image", ImageController.getAllImage);
//GET type-questions by Id
router.get("/get-image/:id", ImageController.getImageByID);
//POST type-questions
router.post("/add-new-image", ImageController.addNewImage);
//PUT Update type-questions
router.put("/update-image", ImageController.updateImage);
//DELETE id type-questions
router.delete("/delete-image/:id", ImageController.deleteImage);
// ---------------------------------------------------------------------------------------------
//REPORT
router.get("/all-report", ReportController.getAllReport);
//GET report by Id
router.get("/get-report/:id", ReportController.getReportById);
//POST type-questions
router.post("/add-new-report", ReportController.addNewReport);
//DELETE id type-questions
router.delete("/delete-report/:id", ReportController.deleteReport);

//refresh token
// router.post('/resfresh-token', AuthController.refreshToken);

//VIEW
router.get("/login", HomeController.login);
router.post("/authen", AuthController.index);

router.get("/", MiddleWareController.verifytoken, HomeController.index);
router.get(
  "/question-information",
  MiddleWareController.verifytoken,
  HomeController.questionInformation
);
router.get("/round", MiddleWareController.verifytoken, HomeController.round);
router.get(
  "/topic-question",
  MiddleWareController.verifytoken,
  HomeController.subjectQuestion
);
router.get("/user", MiddleWareController.verifytoken, HomeController.user);
router.get(
  "/image",
  MiddleWareController.verifytoken,
  HomeController.imageManager
);
router.get(
  "/report",
  MiddleWareController.verifytoken,
  HomeController.reportManager
);
module.exports = router;
