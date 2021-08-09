const model=require('../models/user')
class Service{
registerUser=(user,callback)=>{
    model.createDetails(user,(err,data) =>{
        if(err){
           callback(err,null);
        }else{
             callback(null,data);
        }
    });
};
 loginUser=(loginInfo,callback)=>{
     model.loginUser(loginInfo,(err,data) =>{
        if(err){
           callback(err,null);
         }else{
            callback(null,data);
         }
     });
 }
}
module.exports = new Service(); 