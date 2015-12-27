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


var Users = db.define('users',{
  username:Sequelize.STRING,
  password:Sequelize.STRING
},{
   instanceMethods:{
     getAll:function(onSuccess,onError){
       Users.findAll().then(onSuccess).catch(onError);
     },
     add:function(onSuccess,onError){
       var username = this.username;
       var password = this.password;
       var entity = this.get();
       Users.create(entity).then(onSuccess).catch(onError);
     },
     getById:function(user_id,onSuccess,onError){
       var id = user_id;
       Users.find({where:{id:id}},{raw:true}).then(onSuccess).catch(onError);
     },
     createOrUpdate:function(onSuccess,onError){
       var entity = this.get();
       var user = this;
       console.log(entity);
       if(entity.id!=null){
         Users.update(entity,{where:{id:entity.id}}).then(function(){
           return Users.findById(entity.id);
         }).then(onSuccess).catch(onError);
       }else{
         return Users.create(entity).then(onSuccess).catch(onError);
       }

     }

   }
});
// Users.sync();
var user = Users.build({id:1, username: "caty", password: "admin" });
user.createOrUpdate(function(user){
  console.log(user.get());
},function(err){
  console.log(err);
})
	// user.add(function(success){
	// 	console.log('user create')
	// },
	// function(err) {
	// 	console.log(err)
	// });

// var user = Users.build();
//   user.getById(3,function(user){
//     console.log(user.get());
//   },function(err){
//     console.log(err);
//   })
	// user.getAll(function(users) {
	// 	if (users) {
  //     users.forEach(function(user){
  //       console.log(user.get());
  //     })
  //
	// 	}
	//   }, function(error) {
	// 	  console.log(error);
	//   });
