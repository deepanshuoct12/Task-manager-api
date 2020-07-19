const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')   // importing router
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT 
// const port = process.env.PORT || 3000

const multer = require('multer')
const upload = multer({   // creating a instance of multer
    dest: 'images' ,  // setting destination where all files will go after uploaded
    limits : {
        fileSize : 1000000      // only 1 mb filesize or less can be uploaded
    },
    fileFilter(req,file,cb){   // filtering the file .i.e what file to be accepted req is request being made ,file contains info. about file cb is callback to multer
        if(!file.originalname.match(/\.(doc|docx)$/)){
            return cb(new Error('Please upload a doc file'))
        }
        //    if(!file.originalname.endsWith('.pdf')){
    //        return cb(new Error('Please upload a pdf'))
    //    }
       cb(undefined,true)  // if it is fine then retuen true that file can be uploaded
    }

})
app.post('/upload',upload.single('photo'),(req, res) => {  // multer will find file photo in the request
  res.send()
},(error,req,res,next)=>{   // if error occurs this will send errror in json format
    res.status(400).send({error : error.message})
})


// app.use((req,res,next)=>{
//         if(req.method=='GET')       // if request is get then send the maintanance msg
//         {
//             res.status(503).send('under maintanance')
//         }
//     //console.log(req.method,req.path) // req.method tells tyoe of request

// })
app.use(express.json())
app.use(userRouter)   // parsing the router
app.use(taskRouter)     // parsing the router

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {
//     // const task = await Task.findById('5e7e1cbef378274924e7015a')
//     // await task.populate('owner').execPopulate()  //popultae means fill task owner with virtual field so that we can access user value via owner
//     // console.log(task.owner)

//     const user = await User.findById('5e7e1cb0f378274924e70158')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()
// const bcrypt = require('bcryptjs')     // it is used to hash the password
// const myfunction = async() =>{
//     const password = 'Red12345'
//     const hashedpassword = await bcrypt.hash(password,8) // hashing the password value and run hashing algo. 8 times to create hashed value

//     console.log(password)
//     console.log(hashedpassword)    // hashed value generated
//     const ismatch = await bcrypt.compare('Red12345',hashedpassword)  //  comparing entered pswrd with with previously hashed pswrd it returns true aur false 
//     console.log(ismatch)
// }

//myfunction()

// const jwt = require('jsonwebtoken')  

// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' })  // sign generates the authentication token taling 3 object,string,expired date
//     console.log(token)  // token of 64 bit

//     const data = jwt.verify(token, 'thisismynewcourse') // verifying token matches with sting or not
//     console.log(data)
// }
// myFunction()
//adding an new user
// app.post('/users', async (req, res) => {

 
//     const me = new user(req.body)
         
//     try {
//         await me.save()
//         res.status(201).send(me)
//     } catch (e) {
//         res.status(400).send(e)
//     }
//     //      console.log(me)
//     // me.save().then(() => {
//     //     res.status(201).send(me)  // status 201 means that something is cretaed  
//     // }).catch((e) => {
//     //     res.status(400).send(e)
//     // })
// })


// //read a user
// app.get('/users', async (req, res) => {


//     try {
//         const me = await user.find({})
//         res.send(me)
//     } catch (e) {
//         res.status(500).send()
//     }
//     // user.find({}).then((me) => {
    
//     //     res.send(me)  // find all the user
//     // }).catch((e) => {
//     //     res.status(400).send()
//     // })
// })

// //find user by id

// app.get('/users/:id',async (req,res)=>{
//  const _id = req.params.id
//    try{
      
//         const me = await user.findById(_id)
           
//         if(!me){
//                  return res.status(404).send()      // if user of that id is not found
//             }
        
//             res.send(me)
          
//    } catch(e){
//     res.status(500).send()      // if id isn wrong
//    }

// //  user.findById(_id).then((me)=>{    // find a user by particular id
// //     if(!me){
// //          return res.status(404).send()
// //     }

// //     res.send(me)
// //  }).catch((e)=>{
// //      res.status(500).send()
// //  })

// })

// //UPDATING A USER//
// app.patch('/users/:id', async (req, res) => {         //patch() is used for updating
//     const updates = Object.keys(req.body)      // it takes req.body object and return array of strings  
//     const allowedUpdates = ['name', 'email', 'password', 'age']        // only these properties can be updated else all are invalid
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))   // for every update mentioned in updates array we check weather it is present in allowedUpdates array  if yes then return true else false 

//     if (!isValidOperation) {    // if invalid operation then return error
//         return res.status(400).send({ error: 'Invalid updates!' })
//     }

//     try {
//         const me = await user.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }) // find user by id and then update it req.body contains value to be updtaed new :true means we replace old user by that id by creating the new user by new value
    
//         if (!me) {
//             return res.status(404).send()
//         }

//         res.send(me)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })


// //DELETING A USER

// app.delete('/users/:id', async (req,res)=>{

//     try{
//         const me = await user.findByIdAndDelete(req.params.id)

//         if(!me)
//            {res.status(404).send()}

//            res.send(me)

//     }catch(e){
//              res.status(500).send()
//     }
// })

//.adding a new task//

// app.post('/task', async (req, res) => {

//     const me = new task(req.body)
         
//     try {
//         await me.save()
//         res.status(201).send(me)
//     } catch (e) {
//         res.status(400).send(e)
//     }
      
//     //    const Task = new task(req.body)
            
          
//     //    Task.save().then(() => {
//     //        res.status(201).send(Task)
//     //    }).catch(() => {
//     //        res.status(400).send()
//     //    })
// })

// //find all the task
// app.get('/task', async (req, res) => {
       
//     try {
//         const me = await task.find({})
//         res.send(me)
//     } catch (e) {
//         res.status(500).send()
//     }

//     // task.find({}).then((me) => {
//     //  //    console.log(me)
//     //     res.send(me)  // find all the task
//     // }).catch((e) => {
//     //     res.status(400).send()
//     // })
// })

// // find task by id
// app.get('/task/:id',async (req,res)=>{
//     const _id = req.params.id

//     try{
//         const me = await task.findById(_id)

//         if(!me){
//                  return res.status(404).send()
//             }
        
//             res.send(me)
          
//    } catch(e){
//     res.status(500).send()
//    }
//     // task.findById(_id).then((me)=>{    // find a user by particular id
//     //    if(!me){
//     //         return res.status(404).send()
//     //    }
   
//     //    res.send(me)
//     // }).catch((e)=>{
//     //     res.status(500).send()
//     // })
// })
// //UPDATING A TASK
// app.patch('/task/:id', async (req, res) => {         //patch() is used for updating
//     const updates = Object.keys(req.body)      // it takes req.body object and return array of strings  
//     const allowedUpdates = ['description', 'completed']        // only these properties can be updated else all are invalid
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))   // for every update mentioned in updates array we check weather it is present in allowedUpdates array  if yes then return true else false 

//     if (!isValidOperation) {    // if invalid operation then return error
//         return res.status(400).send({ error: 'Invalid updates!' })
//     }

//     try {
//         const me = await task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }) // find user by id and then update it req.body contains value to be updtaed new :true means we replace old user by that id by creating the new user by new value and run validator means run the validator 
    
//         if (!me) {
//             return res.status(404).send()
//         }

//         res.send(me)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })
// //Deleting a task
// app.delete('/task/:id', async (req,res)=>{

//     try{
//         const me = await task.findByIdAndDelete(req.params.id)

//         if(!me)
//            {res.status(404).send()}

//            res.send(me)

//     }catch(e){
//              res.status(500).send()
//     }
// })