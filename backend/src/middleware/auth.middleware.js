import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


export const protectRoute = async (req, res, next) => {
   
 try {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    if (!decoded) {
        return res.status(401).json({ message: "Not authorized, token failed" });
    }

        const user = await User.findById(decoded.id).select("-password");
        
    if (!user) {
            return res.status(404).json({ message: "Not authorized, user not found" });
    }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        res.user = user;
        next();
    }
    catch (error) {
        console.error("Auth middleware error:", error);
        res.status(500).json({ message: "Not authorized, token failed" });
    }   
};



