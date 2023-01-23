import mongoose from "mongoose"


const messageSchema = mongoose.Schema(
    {
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Users",
        },
        message: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Users",
        },
        messegeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Messege",
        }
    },
    {
        timestamps: true
    },
);
export default mongoose.model('replyMessege', messageSchema);