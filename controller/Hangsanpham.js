
const hangsp = require('./../models/hang')



const hangsanpham = {

    createHang: async(req,res)=>{
        const hang  = req.body.hangnew
    
       try {
     const hangdatabase = await hangsp.findOne({hangsp:hang})
     
      if(hangdatabase)
       return res.status(400).json({message:"Hãng này đã tồn tại trong hệ thống"}) 

      const newhang = new hangsp({
        hangsp :hang 
      })
 
      await newhang.save()

      return res.json({message:"Bạn đã tạo thành công hãng" , newhang})

    } catch (error) {
      
         return res.status(500).json({message:error.message})
      }
    },

    listHang : async(req,res)=>{
    
      const listHang =  await hangsp.find({});
    
      return res.json({listHang})
    },
    

    deleteHang:async(req,res)=>{

      const id  =  req.params.id
      await hangsp.findByIdAndDelete(id).then(()=>{
        return res.json({
          id,
          message:"Xóa hãng thành công"})
      }).catch(()=>{
        return res.status(500).json({message:error.message})
      })


    },
    editHang : async(req,res) =>{
     
  
  try {
    const id  =  req.params.id
    const hangspsua  = await hangsp.findOne({ _id : id}).select(' -_id hangsp')
    return res.json({ edithang: hangspsua  })
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
   

    },
    updateHang : async(req,res)=>{
      try {
        const id  =  req.params.id
       
        const hangdatabase = await hangsp.findOne({hangsp:req.body.hang})
     
        if(hangdatabase)
         return res.status(400).json({message:"Hãng này đã tồn tại trong hệ thống"}) 

        const hangspsua  = await hangsp.findByIdAndUpdate({ _id : id},{hangsp:req.body.hang})
        return res.json({ 
          edithang: hangspsua ,
          message:"Sửa hãng thành công" })
      } catch (error) {
        return res.status(500).json({message:error.message})
      }
    }
}



module.exports = hangsanpham