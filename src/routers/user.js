//SINCE the index.js file is getting longer and longer so we had decided it to break that file that 
//(index.js) file contains route for user,task so we break that and this user.js contains all routes for user 
const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const router = new express.Router()   // by using express u can create router 


//WHILE LOGGING IN OR SIGNING IN  WE DOSENT NEED AUTHENTICATION//
router.post('/users', async (req, res) => {  
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()  // while signing up generate token also
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})
  
router.post('/users/logout',auth ,async (req,res)=>{   // only authenticated user can logout
try{
  req.user.tokens = req.user.tokens.filter((token)=>{     // removing the token by using filter method 
      return token.token !== req.token  // except the token we recieved from client all are copied to tokens array.i.e removing the token 
     
    })
  await req.user.save()  // saving afterchanging the tokens array
  res.send()
}

catch(e){
     res.status(500).send()
}

})

router.post('/users/login', async (req, res) => {  // each time a user login a token is generated
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()  //generate token while loging in
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logoutall',auth, async (req,res)=>{   // we use auth here as auth middle ware will rin beforeasyn (req,res) function

    try{
        req.user.tokens=[]  // logout from everywhere for a user
        await req.user.save()
        res.send()
    }catch(e){
         res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => { // open personal profile  chk weather it is authenticated user or not
    res.send(req.user)    // previouly we are sending all the user at /user request come if .now with request we are sending token also 
})


// router.get('/users', async (req, res) => {  // taking all the users
//     try {
//         const users = await User.find({})
//         res.send(users)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id

//     try {
//         const user = await User.findById(_id)

//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

router.patch('/users/me',auth ,async (req, res) => {
    const updates = Object.keys(req.body)       // takes all the updates in updtes array of string
    const allowedUpdates = ['name', 'email', 'password', 'age']   // these value only can be updtaed
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))  // check if updtes given are on allowed values only or not

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
       // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }) // find by id and updte value i.e create a new user and replace with the user of id given
     //   const user = await User.findById(req.params.id)  // find usr
    
        updates.forEach((update)=>req.user[update]=req.body[update]) // update value 
        await  req.user.save()  // save user 
            res.send(req.user)
        } catch (e) {
            res.status(400).send(e)
        }
})


const upload = multer({
    // dest: 'avatars',
    limits : {
        fileSize : 1000000      // only 1 mb filesize or less can be uploaded
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
//     fileFilter(req,file,cb){   // filtering the file .i.e what file to be accepted req is request being made ,file contains info. about file cb is callback to multer
    
//            if(file.originalname.endsWith('.jpg')){
//             cb(undefined,true)  // if it is fine then retuen true that file can be uploaded
//        }
       
//      else  if(file.originalname.endsWith('.jpeg')){
//         cb(undefined,true)  // if it is fine then retuen true that file can be uploaded
//     }
    
//    else if(file.originalname.endsWith('.png')){
//         cb(undefined,true)  // if it is fine then retuen true that file can be uploaded
//     }
    
//     else
//     return cb(new Error ('Upload either a jpg,jpeg or png '))
     
    }
})
//WE RECIEVE IMAGE FROM USER DO SOME CHNGES AND THEN SAVE IT IN DATABASE
router.post('/users/me/avatar',auth , upload.single('avatar'),async (req, res) => {  // we first chk weather it is authenticated user or not then multer process it and pass it to async function where we save that photo in db as buffer form
//req.user.avatar = req.file.buffer  // image is in buffer form and we store it in user.avatar

const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()  // we give buffer of image to sharp then resize itthen cnvrt to png and then agair cnvrt to buffer
    req.user.avatar = buffer
await req.user.save() // then save it in database
res.send()
},(error,req,res,next)=>{
    res.status(400).send({error : error.message})
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined   // to delete user photo we put undefined in it 
    await req.user.save()  // and save it in databse
    res.send() 
})

router.get('/users/:id/avatar', async (req, res) => {  // send the picture back to user find it by id
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/jpg')   // it has key,value key is content type we set what content should be send back to user value is image
        res.send(user.avatar)// sending user image back
    } catch (e) {
        res.status(404).send()
    }
})


router.delete('/users/me', auth, async (req, res) => {  // we can delete our data only and we should be authenticated before doing so
    try {
        await req.user.remove()  // deleting our own data
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

/*
router.delete('/users/:id', async (req, res) => {  // find by id and delete that user
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})*/

module.exports = router