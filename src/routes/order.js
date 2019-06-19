import express from 'express';
import createNewOrder from '../controller/order/order';
import auth from  '../middleware/authmiddleware';
import priceUpdateOrder from '../controller/order/updateorder';
const order_route=express.Router();

order_route.post('/',auth,createNewOrder);
order_route.patch('/:id/price',auth,priceUpdateOrder);

export default order_route;