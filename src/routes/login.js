import express from 'express';
import userLogin from '../controller/user/login';
const login_route=express.Router();

login_route.post('/signin/', userLogin);
export default login_route;