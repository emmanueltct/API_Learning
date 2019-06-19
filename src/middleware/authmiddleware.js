
import jwt from 'jsonwebtoken' ;
function auth (req,res,next){

    const token=req.header('x-auth-token');
    if(!token) return res.status(400).json({
        status:400,
        error:'access denied no token found'
    });
    
    try{
        const user_verfication= jwt.verify(token,process.env.SECRET);
        req.user_token= user_verfication;
        next();

    }catch(error){
        res.status(400).json({
            status:400,
            error:'invalid token'});
    }
}
export default auth ;
