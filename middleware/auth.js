const jwt = require('jsonwebtoken');
const { PrismaClient } =require( '@prisma/client')
const prisma = new PrismaClient()

const auth = async (req, res, next) =>{
    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, "warkadang")
        console.log(verifyUser)
    } catch (error) {
        res.status(401).send(error)
    }
}

module.exports = auth;