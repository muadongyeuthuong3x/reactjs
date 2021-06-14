
const sanphambans = require('./../models/spban')
const fs = require('fs')

const sanphamban ={
    createsanpham : async(req ,res)=>{
        try {
            const tensanpham = req.body.tensanpham
           
            const giasanpham = req.body.giasanpham

          

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
             })
           
           await savesp.save()

           return res.json({message:"Bạn đã tạo thành công sanpham" })


        } catch (error) {
            return res.status(500).json({message:error.message})
        }
     

    
    },
    listSanpham:async(req,res)=>{
        const listsanpham =  await sanphambans.find({});
      
        return res.json({listsanpham})
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
}
module.exports  = sanphamban