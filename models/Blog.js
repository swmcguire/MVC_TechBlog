const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init(
    {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        blog_title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        message: {
          type: DataTypes.STRING,
        },
        /*date_created: {
          type: DataTypes.DATE, //------------------I DON"T THINK THIS IS A REQUIREMENT - COMMENTED OUT FOR NOW
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },*/
        user_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'user',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'blog',
      }
);


module.exports = Blog;