import { Sequelize } from 'sequelize-typescript';
import { User } from "../../app/Models/User";


const sequelize = new Sequelize({
	dialect: "postgres",
	host: process.env.DB_HOST,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	pool: {
        min: 0,
		max: 10,
		acquire: 30000,
		idle: 10000,
	},
    models: [
        User,
    ],
});

module.exports = sequelize