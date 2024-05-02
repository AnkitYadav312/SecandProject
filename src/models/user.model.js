import mongoose , {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrpt from "bcrypt";

const userSchema = new Schema({
    
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        Type:String, //cloudinary url
        required: true,
    },
    coverImage: {
         type: String, // cloudinary url 
    },
    watchHistory:[ {
         type: Schema.Types.ObjectId,
         ref: "video"
    }
],
password: {
     type: String,
     required: [true, 'Password is required']
},
refreshToken: {
    type: String,
}

},
{
    timestamps: true
}
)


userSchema.pre("save", async function (next){
    if( !this.isModified("password"))return next();

    this.password= bcrpt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
  return   await bcrpt.compare(password,this.password)
} 

userSchema.methods.generateAccessToken= function(){
    jwt.sign{
         _id: this.
    }
}
userSchema.methods.generateRefreshToken = function(){}





export const User = mongoose.model("User", userSchema);