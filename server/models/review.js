export default (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',  // Reference the Users table
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    albumId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allow null for now, testing purposes
      references: {
        model: 'Albums',  // Reference the Albums table
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  });

  Review.associate = (models) => {
    Review.belongsTo(models.User, { foreignKey: 'userId' });
    Review.belongsTo(models.Album, { foreignKey: 'albumId' });
  };

  return Review;
};


  