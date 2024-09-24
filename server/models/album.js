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
    musicBrainzId: {
      type: DataTypes.STRING,
      unique: true, // Make sure the MusicBrainz ID is unique
      allowNull: false,
    },
  });

  Album.associate = (models) => {
    Album.hasMany(models.Review, { foreignKey: 'albumId', sourceKey: 'musicBrainzId', onDelete: 'CASCADE' });
  };

  return Album;
};

  
  