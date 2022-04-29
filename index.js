const express = require("express");
const app = express();
const Sequelize = require("sequelize");
const bodyParser = require('body-parser');
const connection = require("./database/database");
const categoriesRouters = require("./categories/categoriesController");
const articlesRouters = require("./articles/articlesController");
const Category = require("./categories/Category");
const Article = require("./articles/Article");


app.set('view engine','ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/",categoriesRouters);
app.use("/",articlesRouters);



connection
.authenticate()
.then(() =>{
    console.log("Conexão feita com sucesso!");
}).catch((error)=>{
    console.log(error);
});


app.get("/home",(req,res)=>{
    Article.findAll({
        order:[
            ['id','DESC']
        ]
    }).then(articles=>{
        Category.findAll().then(categories=>{
            res.render("index",{
                articles:articles,
                categories:categories
            });
        })
    });
});

app.get("/home/:slug",(req,res)=>{
    let slug = req.params.slug;
    Article.findOne({
        where:{
            slug:slug
        }
    }).then(article =>{
        if(article != undefined){
            res.render("./article",{
                article:article
            });
        }else{
            res.redirect("/home");
        }
    }).catch(err => {
        res.redirect("/home");
    });
});


app.listen(8080, () =>{
    console.log("O servidor está rodando!")
});