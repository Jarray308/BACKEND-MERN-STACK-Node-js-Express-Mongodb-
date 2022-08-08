const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const etudiant = require("./models/etudiant");



const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())




app.get('/all',async(req,res)=>{
   
    try {
        
   
    await Etudiant.find({})
    .then(result => 
        {
            res.send(result)
        } )
    } 
    catch (err) {
    console.log(err)
    }

})

app.post('/Ajouter_etudiants' , async (req,res)=> {
    try {
        
    
    let new_etudiant = new  Etudiant ({
        cin: req.body.cin,
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email

    });
    await new_etudiant.save();
    res.send('Ajouté avec Succées');
} 
    catch (err) {
    console.log(err);
        }
    });


app.delete('/delete/:id' , async (req,res)=>{
     try{
        await Etudiant.findOneAndDelete({id:req.params.id})
        res.send('delete avec Succées');
     }
     catch (err) {
        console.log(err);
            }
});
app.put('/Maj/:id' , async (req,res)=>{
    try{
       await Etudiant.findOneAndUpdate({id:req.params.id} , {
       email: req.body.email
      
    });
    res.send('Modifié avec Succées');
}
    catch (err) {
       console.log(err);
           }
})



mongoose.connect('mongodb+srv://aymen:aymen@cluster0.xq2ub29.mongodb.net/aymen?retryWrites=true&w=majority' ,(err , done)=>{
    if (err) {
        console.log(err)
        
    }
    if (done) {
        console.log('BD Connect')
        
    }
})



app.listen(5000 , ()=>
    console.log("serveur en bien marche")
)