const express=require('express')
const mongoose=require('mongoose')
const dotenv = require('dotenv')


dotenv.config("./.env")

const dbpassword = process.env.DB_PASSWORD

const app = express();
const PORT = 3000;

app.use(express.json())

mongoose.connect('mongodb+srv://abhirajars:${dbpassword}@mndb.wrs0g.mongodb.net/?retryWrites=true&w=majority&appName=Mndb')
.then(res=>{
    console.log("connected")
})
.catch(err=>{
    console.log("failed")
})


const dataSchema=new mongoose.Schema({
    content:{type:String,required:true},
});

const Data=mongoose.model('Data',dataSchema)


app.get('/',async(req,res)=>{
    try {
        const allData = await Data.find();
        res.status(200).json(allData);
      } catch (err) {
        res.status(500).json({ message: 'Error retrieving data', error: err });
}
});


app.post('/', async (req, res) => {
    const { content } = req.body
    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }
    try {
    const newData = new Data({ content });
     const savedData = await newData.save();
      res.status(201).json({ message: 'Data saved successfully', data: savedData });
    } catch (err) {
      res.status(500).json({ message: 'Error saving data', error: err });
    }
  });


app.put('/', (req, res) => {
    res.send('Response for put request');
});


app.delete('/', (req, res) => {
    res.send('Response for DELETE request');
});


app.listen(PORT,()=>{
    console.log("server working")
})