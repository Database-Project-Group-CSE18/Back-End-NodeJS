const jwt = require('jsonwebtoken')

const verifyJWT  = (req,res,next)=>{
    // const token = req.headers["x-access-token"];
    // console.log(token === "null")
    const token = req.cookies.jwt;
    console.log(!token)
    if(!token){
        return res.json({
            auth: false,
            message: "Unauthorized user"
        })
    }
    else{
        jwt.verify(token,process.env.TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(400);
                res.json({auth:false, message:"Authentication failed, invalid token"});
            }
            else{
                console.log("You have authenticated using jwt");
                req.User_ID = decoded.id;
                next();
            }
        })
    }

}

module.exports = verifyJWT;