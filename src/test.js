var db = require('./import/index');
var Person = db.Person;
var person = {name:"test",email:"test@test.com"};

var UserType = db.UserType;

 UserType.findOne({where:{id:1}}).then(function(obj){
  console.log(obj);
  person.userType = obj;
})


// UserType.bulkCreate([
//   {level:'1',name:'sales'},
//   {level:'2',name:'PM'},
//   {level:'3',name:'SA'}
// ]).then(function(){
//   return UserType.findAll();
// })

Person.create(person);
// Person.findAll({
//   include:[{
//     model:UserType
//   }]
// }).then(function(obj){
//   console.log(obj[0].usertype);
// })
