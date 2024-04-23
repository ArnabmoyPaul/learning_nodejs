const express = require('express');
const router = express.Router();
const person = require('./../models/Person');



router.post('/', async (req,res)=>{
    try{
        // assuming the request body contains the person data  
        const data = req.body 
        //Create a new person document using the mongoosh model
        const newPerson = new person(data);
        //Save the new person to the database 
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
  
     }
    
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server error'})
  
    }
  })
router.get('/', async(req,res) =>{
    try{
      const data =await person.find();
      console.log('Data fatched');
      res.status(200).json(data);
  
    }catch(err){
      console.log(err);
        res.status(500).json({error:'Internal Server error'})
  
    }
  })

router.get('/:workType', async (req,res)=>{
    try{
        const workType = req.params.workType;
        if(workType  == 'chef' || workType == 'waiter' || workType == 'manager' ){
  
            const response = await person.find({work: workType});
            console.log('Response fetched');
            res.status(200).json(response);
        }else{
        res.status(404).json({error:'Invalid worktype'})
      }
    }catch(err){
      console.log(err);
      res.status(500).json({error:"Internal Sever failde :) "})
    }
  })

router.put('/:id', async(req,res)=> {
  try{
    const personId = req.params.id;
    const updatedPersonData = req.body;
    const response = await person.findByIdAndUpdate(personId, updatedPersonData,{
      new: true, //Return the update document 
      newValidators: true, // Run Mongoosh validation 
    })

    if(!response){
      return res.status(404).json({error:'Person Not Found'});
    }
    console.log('Data Updated');
    res.status(200).json(response);

  }catch(err){
    console.log(err);
    res.status(500).json({error:"Internal Sever failde :) "})

  }


})

router.delete('/:id', async(req, res) => {
  try{
      const personId = req.params.id;
      const response = await person.findByIdAndUpdate(personId);
      if (!response){
          return res.status(404).json({error: "Person not found"});
      }
      console.log('Data Delete');
      res.status(200).json({message: 'person deleted'});

  }catch(err){
      console.log(err);
      res.status(500).json({error:"Internal Sever failde :) "});

  } 
})


  module.exports = router;