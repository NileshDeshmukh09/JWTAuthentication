const { verify } = require("jsonwebtoken");

function checkToken( req, res, next){
    let token = req.get("authorization");
    if(token){
        token = token.slice(7);
        verify(token, "12Nil", (err , decoded)=> {
            if(err){
                res.json({
                    success : false,
                    msg : "Invalid Token "
                });
            }else{
                next();
            }
        });
    }
    else{
        res.json({
            success : false,
            msg : "Access Denied! Unauthorized User"
        });
    }
}

module.exports = { checkToken }