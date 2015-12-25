var Sequelize = require('sequelize');

var db = new Sequelize('test','root','admin',{
  host:'localhost',
  dialect:'mysql',
  pool:{
    max:5,
    min:0,
    idle:10000
  }
});

var User = db.define('user',{
  firstName:{
    type:Sequelize.STRING,
    field:'first_name'
  },
  lastName:{
    type:Sequelize.STRING
  }
},{
  freezeTableName:true
});

User.sync({force:true}).then(function(){
  return User.create({
    firstName:'John',
    lastName:'Hancock'
  });
});
