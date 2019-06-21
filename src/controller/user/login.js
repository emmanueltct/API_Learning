import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken' ;
import loginvalidation from  '../../validation/login.validation';
import pool from '../../config/config.js'
const userLogin=(req,res)=>{

const {error}=loginvalidation(req.body);
const { email,password} = req.body

 const logingQuery='SELECT * FROM users WHERE email =$1';
 pool.query(logingQuery, [email], (error, answer) => {
    if(answer.rows.length>0){

        const account_password=answer.rows[0].password;
        if(account_password===password){

            const user_token={
                id:answer.rows[0].id,
                email:answer.rows[0].email,
                is_admin:answer.rows[0].is_admin
                }
                const token = jwt.sign({ user_token }, process.env.SECRET);
                res.header('x-auth-token', token)


            return res.status(200).json({
                status:200,
                message:'You are successful loged in',
                token:token,
                data:{
                    email:answer.rows[0].email,
                    first_name:answer.rows[0].first_name,
                    last_name:answer.rows[0].last_name
                }
            })
        }
        else{
            return res.status(400).json({
                status:400,
                error:'incorrect password is provided! please try again'
            })
        }
    }else{
        return res.status(400).json({
            status:400,
            error:`this email ${email} not exist try again` 
        })
    }
});
}

export default userLogin;