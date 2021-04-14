app.get('/edit/:id', (req, res) => {    
    var id = req.params.id;
    var o_id = new ObjectId(id);
   db.collection('blogs').find({_id:o_id}).toArray((err, result) => {
       if (err) return console.log(err)
       console.log(result);
       res.render('edit.ejs',{blogs: result});  
    });
    console.log(req.params.id);
 });
 app.post('/edit',(req, res) => {
     db.collection('blogs').update ({ _id: req.body._id }, {$set: {
        title: req.body.title,
        description: req.body.description
     }
   }, function (err, result) {
        if (err) {
          console.log(err);
        } else {
         console.log("Post Updated successfully");
         res.render('blog.ejs');
   }
 })
})