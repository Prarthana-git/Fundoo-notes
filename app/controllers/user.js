const service= require('../service/user')

class Controller{
register = (req, res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password
    }
    service.registerUser(user, (error,data) => {
        if(error){
           return  res.status(500).json({success:false, message: "Error While Registering", data:null})
        }
       else
       {
         return res.status(200).json({success: true, message: "User has been successfully registered", data:data})
        }
    });
 }

login=(req,res)=>{
    const loginInfo={
        email:req.body.email,
        password:req.body.password
    }
    service.loginUser(loginInfo,(error,data) => {
     if(error){
         return res.status(300).json({success: false, message: "unsuccessful"},error)
     }
     else{
         return res.status(200).json({success: true, message: "User successfully logined In"},data)
     }
   });
}
}
module.exports=new Controller();