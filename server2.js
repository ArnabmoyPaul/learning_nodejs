const express = require('express')
const app = express();
const db = require('./db');
const person = require('./models/Person');
const menu = require('./models/Menu');
const bodyParser = require('body-parser'); 
app.use(bodyParser.json());// request.body 


const Person = require('./models/Person');
const MenuItem = require('./models/Menu');

app.get('/', function (req, res) {
  res.send('Wellcome to the party')
})



app.post('/menu', async (req,res)=>{
  try{
      // assuming the request body contains the person data  
      const data = req.body 
      //Create a new person document using the mongoosh model
      const newMenu = new MenuItem(data);
      //Save the new person to the database 
      const response = await newMenu.save();
      console.log('data saved');
      res.status(200).json(response);

   }
  
  catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server error'})

  }
})

app.get('/menu',async(req,res)=>{
  try{
    const data = await MenuItem.find();
    console.log('Data fatched');
    res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({error:"Internal Sever failde :) "})
  }
})

app.get('menu/:testeType', async (req,res)=>{
  try{
      const testeType = req.params.testeType;
      if(testeType  == 'sweet' || testeType == 'sour' || testeType == 'spicy' ){

          const response = await MenuItem.find({teste: testeType});
          console.log('Response fetched');
          res.status(200).json(response);
      }else{
      res.status(404).json({error:'Invalid TestType'})
    }
  }catch(err){
    console.log(err);
    res.status(500).json({error:"Internal Sever failde :) "})
  }
})

const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

app.listen(3000, ()=>{
    console.log("listening on port 3000");
})

