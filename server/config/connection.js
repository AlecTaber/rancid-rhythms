import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';

// Add debugging logs to check if the environment variables are loaded correctly
console.log('DB_URL:', process.env.DB_URL);           // Check DB_URL
console.log('DB_NAME:', process.env.DB_NAME);         // Check DB_NAME
console.log('DB_USER:', process.env.DB_USER);         // Check DB_USER
console.log('DB_PASSWORD:', process.env.DB_PASSWORD); // Check DB_PASSWORD

const sequelize = process.env.DB_URL
    ? new Sequelize(process.env.DB_URL)
    : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD || '', {
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
            decimalNumbers: true,
        },
    });

export default sequelize;




