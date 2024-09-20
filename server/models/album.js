export default (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    coverUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Album.associate = (models) => {
    Album.hasMany(models.Review, { foreignKey: 'albumId', onDelete: 'CASCADE' });
  };

  return Album;
};

  
  