import express from 'express';
import createNewUser from '../controller/user/signup';
const user_route=express.Router();
user_route.post('/signup/',createNewUser);
export default user_route;