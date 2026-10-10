const articles = [
  { id: 1, title: 'Welcome to the blog', author: 'Admin' },
  { id: 2, title: 'My first Express server', author: 'Aya' },
  { id: 3, title: 'Testing an API with Postman', author: 'Aya' }
];

const getAllArticles =  (req, res) => {
  const { author } = req.query; // equivalent to: const author = req.query.author;

  let result = articles;
  if (author) { // if query parameter ?author= was provided
    result = articles.filter(a => a.author === author);
  }
  res.json({ total: result.length, articles: result });
};

const CreateArticle =  (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) { // validation: both fields are required
    return res.status(400).json({ error: "Title and author are required" });
  }

  const newArticle = { id: nextId, title: title, author: author };
  nextId = nextId + 1;
  articles.push(newArticle);

  res.status(201).json({ message: 'Article created', article: newArticle });
};

const getArticleById = (req, res) => {
  const id = Number(req.params.id); // convert "2" (string) -> 2 (number)
  const article = articles.find(a => a.id === id);

  if (!article) {
    return res.status(404).json({ error: `Article ${id} not found` });
  }
  res.json(article);
};


// 4. Mettre à jour un article existant (PUT /api/ articles /: id)
const updateArticle = (req , res) => {
const id = Number ( req. params .id) ;
const { title , author } = req. body ;
// On recherche l’index de l’article dans le tableau
const index = articles . findIndex (a=> a.id === id) ;
if ( index === -1) {
return res. status (404) . json ({ error : 'Article ${id} introuvable ' }) ;
}
// Mise à jour partielle ou totale
if ( title ) articles [ index ]. title = title ;
if ( author ) articles [ index ]. author = author ;
res . status (200) . json ({ message : 'Article mis à jour ', article : articles [ index ] }) ;
};


// 5. Supprimer un article ( DELETE / api/ articles /: id)
const deleteArticle = (req , res) => {
const id = Number ( req. params .id) ;
const articleExiste = articles . some (a => a.id === id) ;
if (! articleExiste ) {
return res. status (404) . json ({ error : `Impossible de supprimer : article ${id}
introuvable ` }) ;
}
// On filtre pour ne garder que les articles ayant un ID diff é rent
articles = articles . filter (a => a.id !== id) ;
res . status (200) . json ({ message : `Article ${id} supprim é avec succ ès` }) ;
};



// Exportation CommonJS : on rend ces fonctions publiques
module.exports = {
getAllArticles ,
getArticleById ,
CreateArticle ,
updateArticle,
deleteArticle
};