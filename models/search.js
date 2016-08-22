'use strict';
module.exports = function(sequelize, DataTypes) {
  var search = sequelize.define('search', {
    searchTerm: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.search.belongsTo(models.user);
      }
    }
  });
  return search;
};