import express from 'express';
import createNewCar from '../controller/car/car';
import auth from  '../middleware/authmiddleware';
import singleCar from '../controller/car/singlecar';
import statusUpdateCar from '../controller/car/carstatus';
import priceUpdateCar  from '../controller/car/updatecarprice';
import getAllCar  from '../controller/car/viewcar';

const car_route=express.Router();
car_route.post('/',auth,createNewCar);
car_route.get('/:id',singleCar);
car_route.patch('/:id/status',auth,statusUpdateCar);
car_route.patch('/:id/price',auth,priceUpdateCar);
car_route.get('/',getAllCar);

export default car_route;