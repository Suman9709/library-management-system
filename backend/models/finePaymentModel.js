import mongoose from "mongoose";

const finePaymentSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    issue:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Issue"
    },

    amount:{
        type:Number,
        required:true
    },

    paidAt:{
        type:Date,
        default:Date.now
    }
},
{timestamps:true}
);

export default mongoose.model("FinePayment",finePaymentSchema);