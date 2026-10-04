const express = require('express');

const app=express();
const PORT = 3000;


app.get('/',(req,res)=>{
    res.json({message:"hello, i am the blog API"})
});

const articles =[
{ id: 1 , title : 'Welcome to the blog ', author : 'Admin ' } ,
{ id: 2 , title : 'My first Express server ', author : 'Aya' } ,
{ id: 3 , title : 'Testing an API with Postman ', author : 'Aya' }
]

// GET / api/ articles -> fetch all articles
app . get('/api/articles',(req , res) => {
    res.json ({ total : articles . length , articles : articles }) ;
}) ;

// GET / api/ articles /2 -> fetch article whose id equals 2
app.get('/api/articles/:id', (req , res) => {
const id = Number (req.params.id) ; 
const article = articles.find(a => a.id === id) ;
if (!article) {
return res.status(404).json({ error :`Article ${id} not found`}) ;
}
res.json ( article ) ;
}) ;


let nextId = 4; // next auto - incremented id (ids 1 , 2 , and 3 are already assigned )
// POST / api/ articles -> creates an article from { " title ": "..." , " author ": "..." }
app . post ('/api/articles', (req , res) => {
const { title , author } = req.body ; // destructuring ( Step 5)
if (! title || ! author ) { // validation : both fields are strictly required
return res. status (400) . json ({ error : " Title and author are required " }) ;
}
const newArticle = { id: nextId , title : title , author : author };
nextId = nextId + 1;
articles . push ( newArticle ) ;
res . status (201) . json ({ message : 'Article created ', article : newArticle }) ;
}) ;



app.listen(PORT, ()=>{
    app.listen(PORT, ()=>{
        console.log(`Server running at http localhost:${PORT}`)
    })
})
