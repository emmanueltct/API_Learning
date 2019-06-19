
import express from 'express';
import bodyparser from 'body-parser';
import user_router from './routes/users';
import login_route from './routes/login';
import car_route from './routes/car';
import order_route from './routes/order';

const app=express()

app.use(bodyparser.json());

app.use('/api/v2/auth',user_router);
app.use('/api/v2/auth',login_route);
app.use('/api/v2/car',car_route);
app.use('/api/v2/order',order_route);

app.get('/',(req,res)=>{
   return res.status(200).json({
       status:200,
       message:'Welcome to automart this is challenge 3'
   }) 
})
const port=process.env.PORT||3000;
app.listen(port, ()=>console.log(`server staterd at ${port}`));

export default app;