import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {

    const token = req.headers['authorization']?.split(' ')[1];

    if(token){
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if(err){
                res.status(400).json({ message: "Token süresi bitmiş veya hatalı olabilir." });
            }else{
                req.tokenPayload = payload;
                next();
            }
        });
    }else{
        res.status('401').json({ message: "Yetkiniz yok!" });
    }

}

