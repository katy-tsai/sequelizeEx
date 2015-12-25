module.exports = function(sequelize,DataTypes){
  return sequelize.define('usertype',{
    level:DataTypes.INTEGER,
    name:DataTypes.STRING
  },{underscored:true});
}
