const Sequelize = require("sequelize");
const Category = require("../categories/Category");
const connection = require("../database/database");

const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug:{
        type: Sequelize.STRING,
        allowNull:false
    },
    body:{
        type:Sequelize.TEXT,
        allowNull:false
    }
});

// TODO: Implementar relacionamento. não está funcionando.
//Category.hasMany()
//Article.belongsTo(Category);
//Category.hasMany(Article);
Article.belongsTo(Category,{
    constraint:true,
    foreignKey:"categoryId"
});

Article.sync({
    force:false
});

module.exports = Article;