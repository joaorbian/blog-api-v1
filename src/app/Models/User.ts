import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ tableName: "users" })

export class User extends Model<User> {
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		autoIncrement: true,
		unique: true,
		primaryKey: true,
	})
	id: number;

	@Column({
		type: DataType.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: "This field cannot be empty",
			},
			len: {
				args: [4, 50],
				msg: "This field must be between 4 and 50 characters long",
			},
		},
	})
	name: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: "This field cannot be empty",
			},
			len: {
				args: [4, 50],
				msg: "This field must be between 4 and 20 characters long",
			},
		},
	})
	username: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
		unique: true,
		validate: {
			notEmpty: {
				msg: "This field cannot be empty",
			},
			isEmail: {
				msg: "This field needs to be in email format",
			},
		},
	})
	email: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: "This field cannot be empty",
			},
		},
	})
	password: string;

	@Column({
		type: DataType.DATE,
	})
	createdAt?: any;

	@Column({
		type: DataType.DATE,
	})
	updatedAt?: any;
}
