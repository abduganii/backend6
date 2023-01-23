import mongoose from "mongoose"


const messageSchema = mongoose.Schema(
    {
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Users",
        },
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        View: {
            type: Boolean,
            default:false
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Users",
        }
    },
    {
        timestamps: true
    },
);
export default mongoose.model('Messege', messageSchema);