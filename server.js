const express = require('express')
const app = express();
const db = require('./db');
//const person = require('./models/Person');
//const menu = require('./models/Menu');
const bodyParser = require('body-parser'); 
app.use(bodyParser.json());// request.body 


//const Person = require('./models/Person');
//const MenuItem = require('./models/Menu');

app.get('/', function (req, res) {
  res.send('Wellcome to the party')
})




const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes1');
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);




app.listen(3000, ()=>{
    console.log("listening on port 3000");
}) 