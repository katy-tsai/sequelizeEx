module.exports = function(sequelize,DataTypes){
  return sequelize.define('topic',{
    title:DataTypes.STRING
  },{underscored:true})
}
