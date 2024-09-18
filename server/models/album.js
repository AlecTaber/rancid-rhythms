import { DataTypes } from 'sequelize';
import sequelize from '../config/connection';

const Album = sequelize.define('album', {
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