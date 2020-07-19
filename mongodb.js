//THIS FILE IS JUST FOR PRACTICE AND IT HAS NOTHING TO DO WITH TASK PROJECT//
/*
//CRUD  create read update delete
const mongodb = require('mongodb')
const Mongoclient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID


// const { Mongoclient , ObjectID } = require('mongodb')


const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()     // mongodb generates id for us
// console.log(id) // print id
// console.log(id.id)  // print buffer part of id
// console.log(id.toHexString().length)    //print length of id
// console.log(id.getTimestamp())  //print time of id created


Mongoclient.connect(connectionUrl , {useNewUrlParser : true} ,(error,client)=>{

    if(error){
        return console.log('unable to connect to database')
    }


    const db = client.db(databaseName)
    // db.collection('users').insertOne({       // insert one user
    //     name:'Deepanshu',
    //     age : 19,
    //     _id :id   // id is the id generated above from objectid
    // },(error,result)=>{
    //     if(error){
    //         return console.log('unable to insert user')
    //     }
    // console.log(result.ops)  // ops is an array that contains all document inserted
    // })

    // db.collection('users').insertMany([{       // insert many user
    //     name:'Deepanshu',
    //     age : '19'
    // },{
    //     name :'abhi',
    //     age :19
    // }],(error,result)=>{
    //     if(error){
    //         return console.log('unable to insert user')
    //     }
    //     console.log(result.ops)  // ops is an array that contains all document inserted
    // })



    // db.collection('task').insertMany([{       // insert many user
    //     description:'clean the house',
    //      completed : true
    // },{
    //     description:'renew inspection',
    //     completed : false
    // },{
    //     description:'pot plants',
    //     completed : false
    // }]  ,  (error,result)=>{
    //     if(error){
    //         return console.log('unable to insert task')
    //     }
    //     console.log(result.ops)  // ops is an array that contains all document inserted
    // })


    // db.collection('users').findOne({_id : new ObjectID("5e7351b09b59a939340a4d35")},(error,user)=>{  // the first parameter is the thing by which  you want to find data //findone find one data
         
    //     if(error){
    //         return console.log('unable to find')
    //     }
    //     console.log(user)
    // })
///....USERS...///
    // db.collection('users').find({age : 19}).toArray((error,users)=>{  // find all users with age 19 and print them
    //     console.log(users)
    // })
    // db.collection('users').find({age :'19'}).toArray((error,count)=>{ //count users with age 19 and print them
    //    console.log(count)
    // })
///...USERS END..///
///....TASKS../////
    // db.collection('task').findOne({_id : new ObjectID("5e73588ab1e34026c8138edd")},(error,task)=>{  // the first parameter is the thing by which  you want to find data //findone find one data with the matching id
         
    //         if(error){
    //             return console.log('unable to find')
    //         }
    //         console.log(task)
    //     })

        // db.collection('task').find({completed : false}).toArray((error,task)=>{ //print all task with completed false
        //        console.log(task)
        //     })
//...TASK ENDS ....///


//UPDATE START.............//
// const updatepromise = db.collection('users').updateOne( { _id : new ObjectID("5e7364ac0991583f5c7de19b")//updateone update one user
// },
// {
//     // $set: {            // set is update operator
//     //     name : 'mike'
//     // }

//     $inc : {
//            age : 1   // increment age by 1
//     }
// })

// updatepromise.then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })
  

// const updatepromise = db.collection('task').updateMany( { completed : false //updatemany update many user
// },
// {
//     $set: {            // set is update operator
//         completed : true
//     }
// })

// updatepromise.then((result)=>{
//     console.log(result.modifiedCount)           //modified count gives us the no. of entries modified
// }).catch((error)=>{
//     console.log(error)

// })

//.UPDATE ENDS .......................//

//DELETE START..........//
// db.collection('users').deleteMany(  { name : 'mike'} ).then((result)=>{   // delete many users
//     console.log(result)

// }).catch((error)=>{
//     console.log(error)
// })


db.collection('task').deleteMany(  { description : 'renew inspection'} ).then((result)=>{   // delete one task
    console.log(result)

}).catch((error)=>{
    console.log(error)
})
//DELETE ...ENDS .//

})
*/