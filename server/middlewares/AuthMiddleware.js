import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log(req)
    console.log(res)
    console.log(token)
    if (!token) {
        return res.status(401).send("You are not authenticated!");
    }
    jwt.verify(token, process.env.JWT_KEY, async(error, payload) => {
        if (error) {
            return res.status(403).send("Token is not valid!");
        }
        req.userId = payload.userId;
        next();
    });
};