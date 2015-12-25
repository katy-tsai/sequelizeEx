module.exports = function(sequelize,DataTypes){
  return sequelize.define('post',{
    content:DataTypes.TEXT
  },{underscored:true});
}
