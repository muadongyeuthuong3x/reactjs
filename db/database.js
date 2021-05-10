const mongoose = require('mongoose')


const connectDB = async() => {
    try {
        await mongoose.connect('mongodb+srv://manhcuong:manhcuong@cluster0.rzgps.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify:false,
        
        })

        console.log("dataconnect oke")
    } catch (error) {
         throw error;
    }
}

module.exports = connectDB