//SINCE the index.js file is getting longer and longer so we had decided it to break that file that 
//(index.js) file contains route for user,task so we break that and this task.js contains all routes for task

const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})
//GET task?completed=true
//GET/tasks?limit=10&skip=20 //limit tells us no, of result skip tells us the the page ex. page = 20 means show 10 result of 2nd page  
//GET/task?sortBy=createdat:
router.get('/tasks', auth, async (req, res) => {
    const match ={}
    const sort = {}

    if(req.query.completed){
     match.completed = req.query.completed === 'true'    // req.query.completed is string so if it contains true then match.cpmleted get 1 else 0
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1  // 1 for ascending and -1 for descending
    }

    try {
        //await req.user.populate('tasks').execPopulate()
        await req.user.populate({      // send only completed or incompleted acc. to user needs task
            path : 'tasks',
            match,
            options : {
                 limit : parseInt(req.query.limit),  // no. of result to show
                 skip : parseInt(req.query.skip),  // of what page result to show
                 sort
            }
        }).execPopulate()
        res.send(req.user.tasks)          // return tasks of logged in user only 
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id }) //finding task and owner of that task also 

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {  // update logged in user tasks only
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {  // only authenticated user or logged in user can delete the task
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
/*const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks',auth ,async (req, res) => {

   // const task = new Task(req.body)
   const task  = new Task({      //creating a new task
       ...req.body,
       owner : req.user._id   // taking user id for a task .user id comes from auth i.e authenticated user can have task linked with them
   })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id',auth,async (req, res) => {
    const _id = req.params.id

    try {
     //   const task = await Task.findById(_id)
              const task = await Task.findOne({_id ,owner : req.user._id}) //finding task and owner of that task also 
        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
       // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
       const task = await Task.findById(req.params.id)  
       updates.forEach((update)=>task[update]=req.body[update]) 
       await  task.save() 

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router   // exporting the router*/