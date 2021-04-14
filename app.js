import express from 'express' 
import mongoose from 'mongoose' 
import userRoutes from './routes/userRoutes' 
import authRoute from './routes/authRoute'


//constants declared 
const app=express() 
const port=6600 

//mongoose connection 
//mongoose.connect('mongodb+srv://Mohammad:1234@cluster0.s1tn6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useUnifiedTopology:true,useNewUrlParser:true}) 
mongoose.connect('mongodb://127.0.0.1:27017/edureka',{useUnifiedTopology:true,useNewUrlParser:true}) 

const connection=mongoose.connection; 
    connection.once('open',()=>{ 
    console.log("MongoDB connected!!!!") 
}) 


//app configurations 
app.use('/api',userRoutes) 
app.use('/auth', authRoute)
app.set('view engine','ejs') 


app.get('/',(request,response)=>{ 
response.render('index') 
}) 

app.get('/register',(request,response)=>{ 
response.render('register') 
}) 

// app.get('/shoppingList',(request,response)=>{ 
//     response.render('shoppingList') 
//     }) 



//start express app 
app.listen(port,()=>{ 
console.log("app started !!") 
})



