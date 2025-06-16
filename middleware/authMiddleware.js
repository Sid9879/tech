const jwt = require ('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET

const authMiddleware =(req,res,next)=>{
   const token = req.cookies.token;
   if(!token){
         return res.status(401).json({message: "Please login"});
   };
   try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded;
    next();
   } catch (error) {
    res.status(500).json({message: "Your session has expired or token is invalid. Please log in again.",error: error.message});
   }
}


const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'Admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
  next();
};

module.exports = {
      authMiddleware,
      isAdmin

};





