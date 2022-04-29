const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const Article = require("./Article");
const Category = require("../categories/Category");


router.get("/admin/articles",(req,res)=>{
    Article.findAll({ 
        raw: true 
    ,
        include: Category
    }
    ).then(articles =>{
        TODO:// Descomentar abaixo quando relacionamento for
        // implementado
        // include: [{model:Category}]
        res.render("admin/articles/index",{
            articles:articles
        });
    })
});

router.get("/admin/articles/new",(req,res)=>{
    Category.findAll().then(categories =>{
        res.render("admin/articles/new",{
            categories:categories
        });
    });
});

router.post("/articles/save",(req,res)=>{
    let title = req.body.title;
    let body = req.body.body;
    let categoryId = req.body.category;
    Article.create({
        title:title,
        slug:slugify(title),
        body:body,
        categoryId:categoryId
    }).then(()=>{
        res.redirect("/admin/articles");
    });
});

router.get("/admin/articles/edit/:id", (req, res) => {
    let id = req.params.id;
    Article.findByPk(id).then(article => {
        if (isNaN(id)) {
            res.redirect("/admin/articles");
        }
        if (article != undefined) {
            Category.findAll().then(categories =>{
                res.render("admin/articles/edit",{
                    article: article,
                    categories:categories
                });
            });
        } else {
            
            res.redirect("/admin/articles");
        }
    }).catch(erro => {
        res.redirect("/admin/articles");
    });
});


router.post("/articles/delete", (req, res) => {
    let id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {
            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/articles");
            })
        } else {
            res.redirect("/admin/articles");
        }
    } else {
        res.redirect("/admin/articles");
    }
});


router.post("/articles/update", (req, res) => {
    let id = req.body.id;
    let title = req.body.title;
    let body = req.body.body;
    let categoryId = req.body.category
    Article.update(
        {
            title: title,
            slug: slugify(title),
            body: body,
            categoryId: categoryId

        },
        {
            where: {
                id: id
            }
        }).then(() => {
            res.redirect("/admin/articles");
        });
});



module.exports = router;