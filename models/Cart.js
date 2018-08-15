const mongoose = require('mongoose')

const Schema =  mongoose.Schema;

let cartSchema = new Schema(
    {
    
        productIds : [{ 
            type : String,            
        }],
        
        addedOn : {
            type : Date,
            default : Date.now()
        }
    }
)
    
mongoose.model('Cart', cartSchema);