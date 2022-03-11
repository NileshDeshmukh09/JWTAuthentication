const pool = require("../../config/database");

module.exports = {
    create : (data , callBack) => {
        pool.query(
            `INSERT INTO registration( firstName , lastName , Gender , email , password , number) values(? ,? ,?,?,?,?)`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number,
            ],
            (error , result , fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, result)
            }
        );
    },

    getUsers : callBack => {
        pool.query(
            `SELECT ID, firstName, lastName,
            gender, email, Number 
            FROM  registration;
            `,
            
            [],

            (err , results , fields) => {
                if(err){
                    return callBack(err);
                }
                return callBack(null , results);
            });   
    },

    getUserById : (id, callBack) => {
        pool.query(
            `SELECT ID, firstName, lastName , gender ,
             email , number from registration 
             where ID =?
            `,
            [id],
            (err , results , fields) => {
                if(err){
                   return callBack(err);
                }
                return callBack(null , results[0]);
            });
    },

    updateUser: (data , callBack) => {
        pool.query(
            `UPDATE registration SET firstName = ?, lastName = ?,
            gender = ? , email = ? , password = ? , number = ?
            WHERE ID = ?;
            `, 
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number,
                data.ID,
            ],
            (err, results, fields) => {
                if(err){
                   return callBack(err);
                }
                return callBack(null ,results);
            });
    },

    deleteUser : (data , callBack) => {
        pool.query(
            `DELETE FROM registration WHERE ID =?;`
            [data.ID],
            (err ,results, fields) =>{
                if(err){
                   return callBack(err);
                }
                return callBack(null , results[0]);
            });
    },

    getUserByUserEmail : (email , callBack) => {
        pool.query(
            `SELECT * FROM registration WHERE email = ?;`,
            [email],
            (error ,results, field) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            });
    }
};