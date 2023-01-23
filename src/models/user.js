import mongoose from "mongoose"

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true
    },
);
export default mongoose.model('Users', userSchema);