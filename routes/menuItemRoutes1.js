const express = require('express');
const router = express.Router();
const MenuItem = require('../models/Menu');


router.post('/', async (req,res)=>{
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
  
router.get('/',async(req,res)=>{
    try{
        const data = await MenuItem.find();
        console.log('Data fatched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Sever failde :) "})
    }
  })
  
router.get('/:testeType', async (req,res)=>{
    try{
        const testeType = req.params.testeType;
        if(testeType == 'sweet' || testeType == 'spicy' || testeType == 'sour' ){
  
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

  module.exports = router;