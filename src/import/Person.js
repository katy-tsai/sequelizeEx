module.exports = function(db,DataTypes){
  return db.define('person',{
    name:DataTypes.STRING,
    email:DataTypes.STRING,
    async_token:DataTypes.STRING
  },{underscored:true});
}
