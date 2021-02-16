const verifyJWT  = (req,res,next)=>{
    const token = req.headers["x-access-token"];

    if(!token){
        res.send("no token");
    }
    else{
        jwt.verify(token,"JWTSecret",(err,decoded)=>{
            if(err){
                res.json({auth:false, message:"error authentication"});
            }
            else{
                req.userId = eocded.id;
                next();
            }
        })
    }

}


module.exports= { verifyJWT }