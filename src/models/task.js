const mongoose  = require('mongoose')

const taskShema = new mongoose.Schema({         // creating a a model
    description :{
        type : String,
        required : true,
        trim : true
    },
    completed : {
        type : Boolean,
        default : false
    },
    owner: {            // linking with user it stores id of user
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'  //reference to user so that by owner we can call user
    }
},{
    timestamps : true
})

const task = mongoose.model('task',taskShema)
module.exports = task