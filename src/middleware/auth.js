const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
       
        const token = req.header('Authorization').replace('Bearer ', '')  // removing the first word i.e bearer from token recieved
       
        const decoded = jwt.verify(token, process.env.JWT_SECRET)// verifying weather the token is valid or not
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })  // if token is valid find by that id and token

        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user  // if user is found put it in req.user and make it available to other rout handler
     //   console.log(req.token)
        
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth