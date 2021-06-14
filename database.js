const mongoose = require('mongoose');

const URI = 'mongodb+srv://manhcuong:manhcuong@cluster0.rzgps.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


let options = {};

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose
  .connect(URI, options)
  .then(() => console.log('data oke!'))
  .catch((err) => console.log(err));
