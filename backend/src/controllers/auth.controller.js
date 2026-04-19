import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const login = async (req, res) => {
   
    const {fullName, email, password } = req.body;
    
    try{ 
        if (password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters"});
        }

        if(!fullName || !email || !password){
            return res.status(400).json({message: "Please fill all the fields"});
        }
        if (user) return res.status(400).json({message: "User already exists"});

        const user = await User.findOne({email});
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({message: "User created successfully"});

       if(user){
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            res.status(200).json({message: "Login successful"});
        }else{
            res.status(400).json({message: "Invalid credentials"});
        }

       }else{
        res.status(400).json({message: "Invalid credentials"});
       }
       
    }catch(error){
        res.status(500).json({message: "Server error"});
    }   
    
}

export const signup = (req, res) => {
    res.send("Signup route");
}   

export const logout = (req, res) => {
    res.send("Logout route");
}