var Sequelize = require('sequelize');
var path = require('path');
var db = new Sequelize('test','root','admin',{
  host:'localhost',
  dialect:'mysql',
  pool:{
    max:5,
    min:0,
    idle:10000
  }
  });

  var Person = db.import(__dirname+'/Person');
  var UserType = db.import(__dirname+'/UserType');
  var Post = db.import(__dirname+'/Post');
  var Topic = db.import(__dirname+'/Topic');

Person.belongsTo(UserType);
Post.belongsTo(Post,{foreignKey:'reply_to'});
Post.hasMany(Post,{as:'Replies',foreignKey:'replay_to',useJunctionTable:false})
Topic.belongsTo(Post);

  module.exports = {
    Person:Person,
    UserType:UserType,
    Post:Post,
    Topic:Topic
  }

  db.sync();
