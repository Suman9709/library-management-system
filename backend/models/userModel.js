import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user"
        },

        membershipExpiry: {
            type: Date
        }
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({
        userId: this._id,
        role: this.role,
        name: this.name,
        email: this.email
    },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );
}

export default mongoose.model("User", userSchema);