import { Article } from './../../app/Models/Article';
import { Sequelize } from 'sequelize-typescript';
import { User } from "../../app/Models/User";

// DB_HOST="localhost"
// DB_PORT="5432"
// DB_NAME="dbblog"
// DB_USER="progjoao"
// DB_PASSWORD="picapau123"

const sequelize = new Sequelize({
	dialect: "postgres",
	host: process.env.DB_HOST,
	username: "progjoao",
	password: "picapau123",
	database: "dbblog",
	pool: {
        min: 0,
		max: 10,
		acquire: 30000,
		idle: 10000,
	},
    models: [
        User,
		Article
    ],
});

module.exports = sequelize