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

var Customer = db.define('Customer',{
  firstName:{type:Sequelize.STRING},
  lastName:{type:Sequelize.STRING}
});

var Order = db.define('Order',{
  amount:{type:Sequelize.FLOAT}
});

Customer.hasMany(Order,{constraints: true});
Order.belongsTo(Customer,{constraints: true});


function displayResults(results){
  results.forEach(function(c){
    console.dir(c.toJSON());
  });
  console.log('--------------------');
}


var firstCustomer;
var secondCustomer;

db.sync({force:true})
  .then(function(){
    return Customer.create({firstName:'caty',lastName:'tsai'})
  }).then(function(user1){
    firstCustomer = user1;
    return Customer.create({firstName:'kitty',lastName:'hello'})
  }).then(function(user2){
    secondCustomer = user2;
    return Order.create({CustomerId:firstCustomer.id,amount:5});
  }).then(function(){
    return Order.create({CustomerId:firstCustomer.id,amount:15});
  }).then(function(){
    return Order.create({CustomerId:secondCustomer.id,amount:20});
  }).then(function(){
    return Order.findAll({
      attributes:[
        [db.fn('SUM',db.col('amount')),'totalAmount'],
        'CustomerId'
      ],
      group:['CustomerId']
    })
  }).then(displayResults)
  .then(function(){
    process.exit(0);
  })
