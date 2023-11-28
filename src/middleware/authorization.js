const jwt = require("jsonwebtoken")

module.exports = async(req,res,next) => {
    try{

        const jwtToken = req.header("token")

        if(!jwtToken){
            return res.status(403).json("not authorized")
        }

        const payload = jwt.verify

    } catch(err){
        console.error(err.message)
        return res.status(403).json("not authorized")
    }
}

