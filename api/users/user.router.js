const { createUser, 
    getUserByUserID, 
    getUser, 
    userDelete, 
    userUpdate ,
    login
} = require("./user.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation")

router.post("/", createUser);
router.get("/",  checkToken, getUser);
router.get("/:id",  checkToken, getUserByUserID);
router.patch("/", checkToken,  userUpdate);
router.delete("/",  checkToken, userDelete);
router.post("/login", login );

module.exports = router;