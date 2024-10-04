const HomeController = require("../app/controllers/HomeController");

const router = require("express").Router();


router.get('/', HomeController.index);
router.post("/",HomeController.postText);
//api public 
router.get('/api-question/:id', HomeController.questionInGame);
// router.get('/api-round/:id', HomeController.InGame);



module.exports = router;