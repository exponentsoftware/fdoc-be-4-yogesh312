const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const listController = require("../controllers/listController");



const auth = require("../middlewares/auth");
const verify = require("../middlewares/verify");

//router.get("/", auth, catchErrors(listController.getAllList));
router.post("/create", auth, catchErrors(listController.createList));
router.get("/:id", auth, catchErrors(listController.getList)); //get list by list id or get all list of user
router.put("/:id", auth, catchErrors(listController.updateList));
router.delete("/:id", auth, catchErrors(listController.deleteList))
//---------------------------------------------------------------

// router.get("/", auth, verify, catchErrors(listController.getAllByFilter));
//this route is to get lists according to filters as well as without filters
//in query pass category/title to find or sort= new/old to find list
router.get("/user/", auth, catchErrors(listController.getUserList));
router.get("/", auth, catchErrors(listController.getAllListAdmin));

module.exports = router;
