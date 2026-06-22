import rateLimit from "express-rate-limit";

export const authRateLimit = rateLimit({
    windowMs : 3*60*1000, // lasting for 15 min,
    max : 5, // 5 req at a time

    standardHeaders : true,
    legacyHeaders : false,

    message :{
        success : true,
        message : "Too many request try after some times"
    },

    // combine ip and email to create a unique key .. next we will use radis for that

    /*  keyGenerator:(req)=>{
        const email = req.body?.email?.toLowerCaase()?.trim() || "unknown";
        return `${req.ip}:${email}`
    } ,*/

    skipSuccessfulRequests : true
})