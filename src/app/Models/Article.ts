import { User } from "./User";
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";

@Table({ tableName: "articles" })

export class Article extends Model<Article> {
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		autoIncrement: true,
		unique: true,
		primaryKey: true,
	})
	id: number;

	@Column({
		type: DataType.TEXT,
	})
	banner?: string;

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
	title: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
		unique: true,
		validate: {
			notEmpty: {
				msg: "This field cannot be empty",
			},
		},
	})
	text: string;

	@Column({
		type: DataType.STRING,
	})
	image?: string;

	@Column({
		type: DataType.DATE,
	})
	createdAt?: any;

	@Column({
		type: DataType.DATE,
	})
	updatedAt?: any;

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	user_id: number;

	@BelongsTo(() => User)
	user: User;
}
