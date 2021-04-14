import { Router, json } from 'express'; 
import cors from 'cors' 
import user from '../model/user' 
import {LocalStorage} from 'node-localstorage' 
import jwt from 'jsonwebtoken' 
import config from '../config'; 

//defining constants 
const router = Router(); 
var corsOptions={ 
origin:'*', 
optionsSuccessStatus:200 
} 

router.route('/user').get((_, response) => { 
//using mongoose model 
user.find((err,data)=>{ 
    if(err) 
        throw err 
    else 
        response.json(data) 
}) 

}); 

router.route('/user').post(json(),cors(corsOptions), (request, response) => { 
//using mongoose model 
user.create(request.body,(err,data)=>{ 
if(err) 
    throw err 
else 
    response.send(data) 
}) 
}); 



router.route('/profile').get((request, response) => { 
    let localStorage= new LocalStorage('./Scratch') 
    let token=localStorage.getItem('authToken') 
    console.log(">>>>>>>",token) 

if(!token){
    return response.redirect('/') 
}
jwt.verify(token,config.secret,(err,decoded)=>{ 
    if(err){ 
        response.redirect('/') 
    }
    user.findById(decoded.id,{password:0},(err,user)=>{ 
        if(err) {
            response.redirect('/') 
        }
        if(!user) {
            response.redirect('/') 
        }
response.render('profile',{user}) 
}) 

}) 

}); 

router.route('/shoppingList').get((request, response) => { 
    
    response.render('./partials/shoppingList') 

}); 
router.route('/userList').get((request, response) => { 
    
    response.render('./partials/userList') 

}); 
router.route('/addUser').get((request, response) => { 
    
    response.render('./partials/addUser') 

}); 

router.route('/addProduct').get((request, response) => { 
    
    response.render('./partials/addProducts') 

}); 

export default router;
