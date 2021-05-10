const usermodel = require("../models/usermodel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')
const {google} = require('googleapis')
const {OAuth2} = google.auth;
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID )
const fs = require('fs');
const User ={
    registeer : async(req ,res)=>{
        try {
            const {name , username, password} = req.body;
           
            const user = await  usermodel.findOne({username})
            if(user)
            return res.status(400).json({msg: "Tài khoản của bạn đã tồn tại"})
            if(password.length < 6)
            return  res.status(400).json({msg:"Mật khẩu của bạn phải lớn hơn 6 kí tự"})
            
           
            const passwordHash = await bcrypt.hash(password, 10)
            
            const usernew = new usermodel({
                name , username, password:passwordHash
            })
            await usernew.save()
         
            sendMail(username)

            return res.status(200).json({msg:"Bạn đã tạo tài khoản thành công "});

        } catch (error) {
             return res.status(500).json({msg: error.message})
        }
    },
    login:async(req,res)=>{
        try {
            const { username, password} = req.body;
            const user = await  usermodel.findOne({username})
           
            if(!user){
                return   res.status(400).json({msg : "Tài khoản không  tồn tại "})
            }
          
            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch) return res.status(400).json({msg: "Mật khẩu sai"})

            const accesstoken = createToken({id:user.id})
          
            const refreshtoken = createRefreshToken({id:user.id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7d
            })
          return  res.json(accesstoken)
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    googleLogin: async (req, res) => {
        try {
            const {tokenId} = req.body

            const verify = await client.verifyIdToken({idToken: tokenId, audience: process.env.MAILING_SERVICE_CLIENT_ID })
            
            const {email_verified, email, name, picture} = verify.payload

            const password = email + process.env.GOOGLE_SECRET

            const passwordHash = await bcrypt.hash(password, 12)
            

            if(!email_verified) return res.status(400).json({msg: "Email verification failed."})

            const user = await usermodel.findOne({username:email})
        
            if(user){
                const isMatch = await bcrypt.compare(password, user.password)
            
                if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

                const refresh_token = createRefreshToken({id: user._id})
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7*24*60*60*1000 // 7 days
                })

                res.json({msg: "Login success!"})
            }else{
                const newUser = new usermodel({
                    name, username:email, password: passwordHash, avatar: picture
                })
             

                await newUser.save()
                
                const refresh_token = createRefreshToken({id: newUser._id})
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7*24*60*60*1000 // 7 days
                })

                res.json({msg: "Login success!"})
            }


        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
   },

   registeradmin:async(req, res)=>{
   
    try {
        const {name , email, password , role} = req.body;
        
        const image = req.file.filename
       
    
        const user = await  usermodel.findOne({username:email})
   
        if(user  ){
        fs.unlink(`./client/public/image/${image}`, err => {
            if (err) throw err;
           
        })
        return res.status(400).json({showError: "Tài khoản của bạn đã tồn tại"}) 
    }
        if(password.length < 6){ 
        fs.unlink(`./client/public/image/${image}`, err => {
            if (err) throw err;
           
        })
        return  res.status(400).json({showError:"Mật khẩu của bạn phải lớn hơn 6 kí tự"})
    }
    
        const passwordHash = await bcrypt.hash(password, 10)
    
        const usernew = new usermodel({
            name , username:email, password:passwordHash, role ,avatar:image
        })
        await usernew.save()
       
      

    

      return res.status(200).json({
            usernew,
            successMessage: 'Tao admin thanh cong'
        })


    } catch (error) {
         return res.status(500).json({showError: error.message})
    }
   },

   getListUser:async(req  , res)=>{

   try {
       const ListUser = await usermodel.find({role:"Admin"});
       return res.status(200).json({
        ListUser
       })
   } catch (error) {
    res.status(500).json({
        showError: 'Lay danh sach that bai',
    });
   }

   },
   editUser:async(req  , res)=>{
       const id = req.params.id
    try {
        const data = await usermodel.find({_id:id}).select('-password -role');
      
        return res.status(200).json({
            data
        })
        
    } catch (error) {
     res.status(500).json({
         errorMessage: 'Lay danh sach that bai',
     });
    }
   },
   upDateUser : async(req,res)=>{
       const id = req.params.id
       const {name , password } = req.body
       try {
       if(req.file){
         const {avatar1} = req.body
        const image = req.file.filename
        console.log(avatar1)
        fs.unlink(`./client/public/image/${avatar1}`, err => {
            if (err) throw err;
           
        }); 
       await  usermodel.findByIdAndUpdate(id,{
             name, password, avatar:image
         })

       }
       else{
        await  usermodel.findByIdAndUpdate(id,{
            name, password
        })
       }
     
       return res.status(200).json({
       successMessage : "Thong tin duoc thay doi thanh cong"
    })
} catch (error) {
    res.status(500).json({
        errorMessage: 'Xóa thất bại',
    });
   }

   },
   DeleteAdmin: async(req,res)=>{
    const id = req.params.id

    try {
        const deletedUserAdmin = await usermodel.findByIdAndDelete(id);

        fs.unlink(`./client/public/image/${deletedUserAdmin.avatar}`, err => {
			if (err) throw err;
			console.log(
				'Xóa ảnh oke'
			);
		});
        return res.status(200).json({
            deletedUserAdmin,
            successMessage : "Xóa Admin thành Công",
         })
        
    } catch (error) {
     res.status(500).json({
         errorMessage: 'Xóa thất bại',
     });
    }

   }
}

const createToken = (id)=>{
    return jwt.sign(id, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
}

const createRefreshToken = (id)=>{
    return jwt.sign(id, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = User