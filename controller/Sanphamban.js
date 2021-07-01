
const sanphambans = require('./../models/spban')
const fs = require('fs')
const Comments = require('../models/commentModel')
const giohang = require('../models/giohang')


class Apifeatures{
  constructor(query , queryString){
    this.query = query ;
    this.queryString = queryString ;
  }
  filtering(){

  }

  sorting(){
    
  }

  paginating(){
    
  }
}


const sanphamban ={
    createsanpham : async(req ,res)=>{
        try {
            const tensanpham = req.body.tensanpham     
            const giasanpham = req.body.giasanpham
            const idhang = req.body.idhang
            const file =req.files
            const imgchinh = file.pop()
            const   cacanhkhac = []
            file.forEach(element => {
             
                cacanhkhac.push( element.filename)  
            });
             const savesp = new sanphambans({

                tensanpham:tensanpham,
                giaban:giasanpham,
                anhsanphamchinh:imgchinh.filename,
                cacanhkhac:cacanhkhac,
                idhang :idhang             })
           
           await savesp.save()

           return res.json({message:"Bạn đã tạo thành công sanpham" })


        } catch (error) {
            return res.status(500).json({message:error.message})
        }
     

    
    },
    listSanpham:async(req,res)=>{
      try{
        
        const feature = new Apifeatures( sanphambans.find({}) , req.query)
        console.log(req.query)

        const listsanpham =  await sanphambans.find({});
      
        return res.json({listsanpham})

      } catch (error) {
            return res.status(500).json({message:error.message})
        }
       
      },
      deletesanpham:async(req,res)=>{

        const id  =  req.params.id

        const sanphamdelete = await sanphambans.findById(id)
          
        const imgchinh = sanphamdelete.anhsanphamchinh

        const imgphu = sanphamdelete.cacanhkhac

        fs.unlinkSync(`public/images/${imgchinh}`, err => {
			if (err) throw err;
            
		});

    
        imgphu.map(img=>{
            fs.unlinkSync(`public/images/${img}`, err => {
                if (err) throw err;
               
            });
     
        })


        await sanphambans.findByIdAndDelete(id).then(()=>{
          return res.json({
            id,
            message:"Xóa sản phẩm thành công"})
        }).catch(()=>{
          return res.status(500).json({message:error.message})
        })
    },
    editsanpham : async(req,res) =>{
     
  
        try {
          const id  =  req.params.id
          const sanphamsua  = await sanphambans.findOne({ _id : id}).select(' -_id')
          return res.json({ editsanpham: sanphamsua  })
        } catch (error) {
          return res.status(500).json({message:error.message})
        }
    },
    getsanpham : async(req,res) =>{
     
  
      try {
        const id  =  req.params.id
        const sanphamshow  = await sanphambans.findOne({ _id : id}).select(' -_id')
         const comments = await Comments.find({product_id:req.params.id});

        return res.json({ getsanpham: sanphamshow , comments : comments  })




      } catch (error) {
        return res.status(500).json({message:error.message})
      }
    },

    muasanpham : async(req,res) =>{
      const {  nguoimua , sdt , diachi } = req.body.thongtinnguoimua;
      
      const datasanpham =  req.body.sanphammua
      
      if(nguoimua.length < 5) 
      return res.status(400).json({
        message:"Yêu cầu bạn điền đúng tên  "})

        if(diachi.length < 5) 
        return res.status(400).json({
          message:"Yêu cầu bạn điền đúng địa chỉ  "})

          
        if(sdt.length < 8 || sdt.length >11) 
        return res.status(400).json({
          message:"Số điện thoại không đúng   "})

          var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
          if(vnf_regex.test(sdt) ===false){
            return res.status(400).json({
              message:"Số điện thoại không đúng   "})
          }

          let array = []
          datasanpham.map(e=>{
            
          let donhang = {
             tensanpham: e.tensanpham , soluong:e.number , giaban:e.giaban ,tongtien : ((e.number)*(e.giaban)) 
           }
           array.push(donhang)
          })
         
       
  
      try {
       
        const newgiohang = new giohang({
          nguoimua :nguoimua  , sdt : sdt , diachi : diachi ,userid:req.userId ,cart : array
        })
         await newgiohang.save();
       

         return res.json({
          message:"Mua sản phẩm thành công "})

      } catch (error) {
        return res.status(500).json({message:error.message})
      }
    },


    listdonhang :  async(req,res) =>{

      try {
        const data = await giohang.find({})
        return res.json({
          data
        })
      }
       catch (error) {
        return res.status(500).json({message:"server error"})
      }
        
    },


}
module.exports  = sanphamban