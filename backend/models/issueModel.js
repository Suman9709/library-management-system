import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book"
    },

    issueDate:{
        type:Date,
        default:Date.now
    },

    dueDate:{
        type:Date,
        required:true
    },

    returnDate:{
        type:Date
    },

    status:{
        type:String,
        enum:["issued","returned","overdue"],
        default:"issued"
    }
},
{timestamps:true}
);

export default mongoose.model("Issue",issueSchema);