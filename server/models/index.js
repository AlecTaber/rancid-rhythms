import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import { fileURLToPath, pathToFileURL } from 'url';
import process from 'process';
import sequelize from '../config/connection.js'; // Import the Sequelize instance from connection.js

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);

const db = {};

// Dynamically import models and initialize them
const models = fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  });

for (const file of models) {
  const modelPath = pathToFileURL(path.join(__dirname, file)).href;
  const { default: model } = await import(modelPath);
  
  if (typeof model === 'function') {
    const modelInstance = model(sequelize, Sequelize.DataTypes);
    db[modelInstance.name] = modelInstance;
  }
}

// Handle model associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export the sequelize instance and models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;





