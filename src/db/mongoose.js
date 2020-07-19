const mongoose  = require('mongoose')
mongoose.connect(process.env.MONGODB_URL ,{
    useNewUrlParser : true,
    useCreateIndex:true
})



// const me = new user ({      // create a user to inserted
//     name  : 'mike',
//     email : 'mike@gmail.com',
//     password : '409876_9'
// })

// me.save().then(()=>{        // save user to databases
//     console.log(me)
// }).catch((error)=>{
//     console.log('Error!',error)
// })



//////TASK/////
// const task = mongoose.model('task',{         // creating a a model
//     description :{
//         type : String,
//         required : true,
//         trim : true
//     },
//     completed : {
//         type : Boolean,
//         default : false
//     }
// })

// const me = new task ({      // create a task to inserted
//     description : 'renew task',
//     completed : false
// })

// me.save().then(()=>{        // save user to databases
//     console.log(me)
// }).catch((error)=>{
//     console.log('Error!',error)
// })

