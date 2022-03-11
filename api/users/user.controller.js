const { 
    create , 
    getUserById, 
    getUsers, 
    updateUser, 
    deleteUser,
    getUserByUserEmail,
 } = require("./user.service");

const { genSaltSync , hashSync , compareSync} = require("bcrypt");
const { sign } = require("jsonwebtoken");
const jsonwebtoken = require("jsonwebtoken");

function createUser(req, res){
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password , salt);
    create(body, (err, results) => {
        if(err){
            console.log(err);
            return res.status(500).json({
                success : false,
                msg : "Database Connection Error !"
            });
        }
        return res.status(200).json({
            success : true,
            msg : "Successfully signup!",
            data : results
        })
    })
}

function getUserByUserID(req, res){
    const id = req.params.id;
    getUserById(id , (err, results) => {
        if(err){
            console.log(err);
            return;
        }
        if(!results){
            return res.json({
                success : false,
                msg : "Record Not Found!"
            });
        }
        return res.json({
            success : true,
            msg : "Sucessfully Fetched User",
            data : results
        });
    });

}

function getUser(req, res){
    getUsers((err , results) => {
        if(err){
            console.log(err);
            return;
        }
        return res.status(200).json({
            success : 1, 
            data : results
        });
    });
}

function userUpdate(req, res){
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password , salt);
    updateUser(body , (err, results) =>{
        if(err){
            console.log(err);
            return res.status(500).json({
                success : false,
                msg : "Internal Server Error!"
             });
        }
        if(!results){
            return res.status(404).json({
                success : false,
                msg : "Failed to update user!"
            });
        }
        return res.status(200).json({
            success : true, 
            msg : "Updated Successfully !",
            data : results
        });

    })
};

function userDelete( req, res){
    const  data = req.body;
    deleteUser(data , (err, results)=>{
        if(err){
            console.log(err);
            return;
        }

        if(!results){
            return res.json({
                success : false,
                msg : "Record Not Found",
            });   
        }
        
        return res.json({
            success : true,
            msg : " User Deleted Successfully !"
        });

    });
}

function login(req, res) {
    const body = req.body;
    getUserByUserEmail(body.email, (err , results) => {
        if(err){
            console.log(err);
        }
        if(!results){
            return res.json({
                success : false,
                msg : "Invalid Email or password"
            });
        }
        const loginResult = compareSync(body.password , results.password);
        if(loginResult){
            results.password = undefined;
            const jsonToken = sign({ loginResult : results }, "12Nil" , {
                expiresIn: "1h"
            });
            return res.json({
                success : true,
                msg : "login Successfully !",
                data : results,
                token : jsonToken
            });
        }
        else{
            return res.status(500).json({
                success : false,
                msg : "Invalid Email or Password"
            });
        }
    })
}


module.exports = { createUser , getUserByUserID ,getUser, userUpdate , userDelete , login  }