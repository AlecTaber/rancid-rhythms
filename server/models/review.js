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
        model: 'Users', // Foreign key referencing the User model
        key: 'id',
      },
    },
    albumId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Albums', // Foreign key referencing the Album model
        key: 'id',
      },
    },
  });

  Review.associate = (models) => {
    Review.belongsTo(models.User, { foreignKey: 'userId' });
    Review.belongsTo(models.Album, { foreignKey: 'albumId' });
  };

  return Review;
};

  