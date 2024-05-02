const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

        userId :{
            type: String,
            default: () => Math.random().toString(36).substr(2,9)
        },
        courses :[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'courses'
        }]

})
module.exports = mongoose.models.User || mongoose.model('user', userSchema);
