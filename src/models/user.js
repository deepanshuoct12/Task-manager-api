const mongoose  = require('mongoose')
const validator  = require('validator')
const bcrypt = require('bcryptjs')  
const jwt = require('jsonwebtoken')
const Task = require('./task')
const userSchema = new mongoose.Schema({        // ceating a user schema i.e how  A User looks like  and mentioning its properties 

    name :{
        type : String,   
        trim : true          // trim the  spaces from name  entered 
    },
    email : {
        type : String,
        trim : true,
        unique : true,
        lowercase : true,
        required : true,       // convert the email to lower case 
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('age must be a positive number');
                
            }
        }

    }
    ,
    password : {
        type : String,
        required : true,
        minlength : 7,
        trim : true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('password contaons pswrd')
            }
        },
       
    }
        ,
    age : {
        type : Number,
        default : 0,  // by default no. is 0
        validate(value){        // chk the input value  by using the validator
            if(value<0)throw new Error('age must be a positive number')

        }
    },
   
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar : {          // this is for user to upload photo
        type :Buffer
    }
},
{ 
    timestamps : true
})  

userSchema.virtual('tasks', {   // in db user dosent have task ..it is just virtually have task 
    ref: 'task',  // referance to task
    localField: '_id',   // contains local data user id contains relationship with task owner
    foreignField: 'owner'  // field on the other thing in this case to task 
})

userSchema.methods.toJSON = function () {  // we used tojson here as it allows us to do manipulation before sending the user object
    const user = this  // this refers to current object
    const userObject = user.toObject()

    delete userObject.password  //   before sending user to client if any rout handler demands for it we delete password
    delete userObject.tokens  // and tokens i.e if someone login ex. he can't see hashed password and tokens of all user only of himself he can see
    delete userObject.avatar // we dont allow to see avatar if someone user demands for 
    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const me = this
    const token = jwt.sign({ _id: me._id.toString() },  process.env.JWT_SECRET) // genertae token for every user

    me.tokens = me.tokens.concat({ token })  // concatenate token generated for the user with tolens array
    await me.save() // save the token

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
   
    const me = await user.findOne({ email })
       
    if (!me) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, me.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return me
}



//HASHING THE PASSWORD BEFORE SAVING//
userSchema.pre('save',async function(next){// just before saving user we use middleawre to perform some operation  
    const me = this  // current user
    //console.log('just before saving user')

    if(me.isModified('password'))   //  chk weather password is different than befor entered or not if yes then hash it it is true for the first time compulsory
    {
         me.password = await bcrypt.hash(me.password,8)
    }

    next() // aftet our work is done we call next 
})

//when user is deleted then all its task are also deleted
userSchema.pre('remove',async function(next){
  const me = this
   await Task.deleteMany({owner: me._id})  // delete all task where owner value is user._id
  next()


})

const user = mongoose.model('user',userSchema)  // creating a a model

  
module.exports = user

// const user = mongoose.model('user',{         // creating a a model
//         name :{
//             type : String,   
//             trim : true          // trim the  spaces from name  entered 
//         },
//         email : {
//             type : String,
//             trim : true,
//             lowercase : true,
//             required : true,       // convert the email to lower case 
//             validate(value){
//                 if(!validator.isEmail(value)){
//                     throw new Error('age must be a positive number');
                    
//                 }
//             }
    
//         }
//         ,
//         password : {
//             type : String,
//             required : true,
//             minlength : 7,
//             trim : true,
//             validate(value){
//                 if(value.toLowerCase().includes('password')){
//                     throw new Error('password contaons pswrd')
//                 }
//             },
           
//         }
//             ,
//         age : {
//             type : Number,
//             default : 0,  // by default no. is 0
//             validate(value){        // chk the input value  by using the validator
//                 if(value<0)throw new Error('age must be a positive number')
    
//             }
    
      
    
         
//         }
//     })
  