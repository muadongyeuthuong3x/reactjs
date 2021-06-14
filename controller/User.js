const usermodal = require('./../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const user = {

     dangkitaikhoan :async(req ,res)=>{

         try {
             const data = req.body;

             const datauserdatabase = await usermodal.findOne({email:data.email})
             if(datauserdatabase)
             return res.status(400).json({message:"Tài khoản này đã tồn tại trong hệ thống"}) 
             
             const hasspassword = await bcrypt.hash(data.password,10)
             const datasave = new usermodal({
                 email:data.email,
                 password:hasspassword

             })

           await  datasave.save()
           return res.json({ message: "Tạo tài khoản thành công" })
         } catch (error) {
            return res.status(500).json({message:error.message}) 
         }

    },
    
      dangnhap :async(req ,res)=>{
             try {
                
                   const {email,password} = req.body
    
                   const userdata =await usermodal.findOne({email:email})

                   if(!userdata)
                    return res.status(400).json({message: "Tài khoản của bạn sai "})
                 
                   const isMatch = await bcrypt.compare(password, userdata.password)

                   if(!isMatch) return res.status(400).json({message: "Mật khẩu của bạn không đúng "})
                
                   const accesstoken = createAccessToken({id: userdata._id})

                   res.json({
                    message: "Bạn đang nhập thành công ",
                   accesstoken,
                   userdata 
                })


             } catch (error) {
                return res.status(500).json({message:error.message}) 
             }
      },
      listuserchat :async(req,res)=>{
        
        try {
           const listuser = await usermodal.find()

           res.json({
            listuser
        })

      }catch (error) {
        return res.status(500).json({message:"Server error"}) 
     }
    }

}


const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '11m'})
}

module.exports  =  user