const User=require('../models/userModel')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

exports.userSignUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: "email or password cannot be empty" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ error: "The user already exists! Please login" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ email, id: newUser._id }, process.env.SECRET_KEY);
    return res.status(200).send({ token, user: newUser });
  } catch (err) {
    console.error("Signup Error:", err); // This will now log the MongoDB error
    return res.status(500).send({ error: "Internal Server Error" });
  }
};
exports.userLogin=async(req,res)=>{
    const {email,password}=req.body;
        if(!email ||!password){
            return res.status(400).send({error:"email or password cannot be empty"})
        }
        let user=await User.findOne({email})
        if(user && bcrypt.compare(password,user.password)){
            let token=jwt.sign({email,id:user._id},process.env.SECRET_KEY)
            return res.status(200).send({token,user})
        }
        else{
            return res.status(400).send({error:"Invalid credentials"})
        }
}
exports.getUser=async(req,res)=>{
    const id=req.params.id;
        const user=await User.findById(id);
        return res.status(200).send({email:user.email})
}